import { handleAppStoreServerNotification } from "@/lib/app-store-notifications";

export const runtime = "nodejs";

/** App Store Server Notifications V2 — POST only. Optional GET for uptime checks. */
export async function POST(request: Request) {
  return handleAppStoreServerNotification(request);
}

export async function GET() {
  return new Response("ok", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
