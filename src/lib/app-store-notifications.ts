import { readFileSync } from "fs";
import { join } from "path";
import {
  Environment,
  SignedDataVerifier,
  VerificationException,
  VerificationStatus,
  type ResponseBodyV2DecodedPayload,
} from "@apple/app-store-server-library";

let appleRootsCache: Buffer[] | null = null;

function loadAppleRootCertificates(): Buffer[] {
  if (appleRootsCache) return appleRootsCache;
  const dir = join(process.cwd(), "certs", "apple-root");
  appleRootsCache = [
    readFileSync(join(dir, "AppleRootCA-G3.cer")),
    readFileSync(join(dir, "AppleIncRootCertificate.cer")),
  ];
  return appleRootsCache;
}

function certificateOnlineChecksEnabled(): boolean {
  return process.env.APPLE_CERT_ONLINE_CHECKS === "true";
}

let sandboxVerifier: SignedDataVerifier | undefined;
let productionVerifier: SignedDataVerifier | undefined;

function verifierSandbox(bundleId: string): SignedDataVerifier {
  if (!sandboxVerifier) {
    sandboxVerifier = new SignedDataVerifier(
      loadAppleRootCertificates(),
      certificateOnlineChecksEnabled(),
      Environment.SANDBOX,
      bundleId,
      undefined,
    );
  }
  return sandboxVerifier;
}

function verifierProduction(bundleId: string, appAppleId: number): SignedDataVerifier {
  if (!productionVerifier) {
    productionVerifier = new SignedDataVerifier(
      loadAppleRootCertificates(),
      certificateOnlineChecksEnabled(),
      Environment.PRODUCTION,
      bundleId,
      appAppleId,
    );
  }
  return productionVerifier;
}

async function verifyNotificationPayload(signedPayload: string): Promise<{
  payload: ResponseBodyV2DecodedPayload;
  verifier: SignedDataVerifier;
}> {
  const bundleId = process.env.APP_STORE_BUNDLE_ID;
  if (!bundleId?.trim()) {
    throw new Error("APP_STORE_BUNDLE_ID is not set");
  }

  try {
    const payload = await verifierSandbox(bundleId).verifyAndDecodeNotification(signedPayload);
    return { payload, verifier: verifierSandbox(bundleId) };
  } catch (error) {
    const retryProduction =
      error instanceof VerificationException &&
      error.status === VerificationStatus.INVALID_ENVIRONMENT;

    if (!retryProduction) {
      throw error;
    }
  }

  const appAppleIdRaw = process.env.APP_STORE_APP_APPLE_ID?.trim();
  if (!appAppleIdRaw) {
    throw new Error(
      "APP_STORE_APP_APPLE_ID is not set (required for production notifications)",
    );
  }

  const appAppleId = Number(appAppleIdRaw);
  if (!Number.isFinite(appAppleId)) {
    throw new Error("APP_STORE_APP_APPLE_ID must be a numeric App Store Connect app ID");
  }

  const payload = await verifierProduction(bundleId, appAppleId).verifyAndDecodeNotification(
    signedPayload,
  );
  return { payload, verifier: verifierProduction(bundleId, appAppleId) };
}

async function formatNotificationBody(
  verifier: SignedDataVerifier,
  payload: ResponseBodyV2DecodedPayload,
): Promise<string> {
  const lines: string[] = [];

  if (payload.notificationType) {
    lines.push(`Type: ${payload.notificationType}`);
  }
  if (payload.subtype) {
    lines.push(`Subtype: ${payload.subtype}`);
  }

  const signedTx = payload.data?.signedTransactionInfo;
  if (signedTx) {
    try {
      const tx = await verifier.verifyAndDecodeTransaction(signedTx);
      if (tx.productId) lines.push(`Product: ${tx.productId}`);
      if (tx.transactionReason) lines.push(`Transaction reason: ${tx.transactionReason}`);
      if (tx.environment) lines.push(`Store env: ${tx.environment}`);
    } catch {
      // Ignore nested verification failures; outer notification is already verified.
    }
  } else if (payload.data?.environment) {
    lines.push(`Store env: ${payload.data.environment}`);
  }

  if (payload.notificationUUID) {
    lines.push(`Notification: ${payload.notificationUUID}`);
  }

  return lines.join("\n") || "App Store notification (no extra fields decoded).";
}

async function sendNtfy(title: string, body: string): Promise<void> {
  const url = process.env.NTFY_TOPIC_URL?.trim();
  if (!url) return;

  const token = process.env.NTFY_ACCESS_TOKEN?.trim();
  const headers: Record<string, string> = {
    Title: title.slice(0, 390),
    "Content-Type": "text/plain; charset=utf-8",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`ntfy push failed (${response.status}): ${text || response.statusText}`);
  }
}

function webhookAuthorized(request: Request): boolean {
  const secret = process.env.APP_STORE_WEBHOOK_SECRET?.trim();
  if (!secret) return true;

  const auth = request.headers.get("authorization");
  const bearer =
    auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : undefined;

  const url = new URL(request.url);
  const tokenQuery =
    url.searchParams.get("token") ??
    url.searchParams.get("secret");

  return bearer === secret || tokenQuery === secret;
}

export async function handleAppStoreServerNotification(request: Request): Promise<Response> {
  if (!webhookAuthorized(request)) {
    return new Response(null, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const signedPayload =
    body &&
    typeof body === "object" &&
    "signedPayload" in body &&
    typeof (body as { signedPayload?: unknown }).signedPayload === "string"
      ? (body as { signedPayload: string }).signedPayload
      : undefined;

  if (!signedPayload) {
    return new Response(null, { status: 400 });
  }

  try {
    const { payload, verifier } = await verifyNotificationPayload(signedPayload);
    const detail = await formatNotificationBody(verifier, payload);
    const title = `App Store · ${payload.notificationType ?? "notification"}`;

    await sendNtfy(title, detail).catch((error) => {
      console.error("[app-store-notifications] ntfy error:", error);
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof VerificationException) {
      console.warn("[app-store-notifications] verification failed:", error.status, error.cause);
      return new Response(null, { status: 400 });
    }

    console.error("[app-store-notifications] handler error:", error);
    const status =
      error instanceof Error &&
      (error.message.includes("not set") || error.message.includes("must be"))
        ? 500
        : 400;
    return new Response(null, { status });
  }
}
