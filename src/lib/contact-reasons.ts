export const CONTACT_REASON_VALUES = [
  "inquiry",
  "request",
  "bug",
  "billing",
  "partnership",
  "security",
  "feedback",
  "other",
] as const;

export type ContactReason = (typeof CONTACT_REASON_VALUES)[number];

export const CONTACT_REASON_LABELS: Record<ContactReason, string> = {
  inquiry: "General inquiry",
  request: "Feature or change request",
  bug: "Bug report",
  billing: "Billing or account",
  partnership: "Partnership or press",
  security: "Security issue",
  feedback: "Feedback",
  other: "Other",
};

export function isContactReason(value: string): value is ContactReason {
  return (CONTACT_REASON_VALUES as readonly string[]).includes(value);
}

export function contactReasonLabel(value: ContactReason): string {
  return CONTACT_REASON_LABELS[value];
}
