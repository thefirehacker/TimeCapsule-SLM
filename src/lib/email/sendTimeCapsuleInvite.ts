import { getResendClient } from "./resendClient";

const resend = getResendClient();
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "TimeCapsule";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://timecapsule.bubblspace.com";

interface TimeCapsuleInviteEmailOptions {
  recipient: string;
  inviterName?: string | null;
  inviterEmail?: string | null;
  capsuleName?: string | null;
  shareUrl?: string;
}

export async function sendTimeCapsuleInviteEmail(
  options: TimeCapsuleInviteEmailOptions
) {
  if (!resend) {
    console.info(
      "Skipping TimeCapsule invite email: RESEND_API_KEY not configured."
    );
    return;
  }

  const inviterDisplay =
    options.inviterEmail && options.inviterName
      ? `${options.inviterName} (${options.inviterEmail})`
      : options.inviterName || options.inviterEmail || "A teammate";

  const capsuleLabel = options.capsuleName || "a TimeCapsule project";
  const normalizedSite = SITE_URL.replace(/\/$/, "");
  const shareBlock = options.shareUrl
    ? `<p><a href="${options.shareUrl}" target="_blank" rel="noopener">Open the shared TimeCapsule</a></p>`
    : `<p>Sign in at <a href="${normalizedSite}" target="_blank" rel="noopener">${normalizedSite}</a> to view projects shared with you.</p>`;

  const subject = `${inviterDisplay} invited you to ${SITE_NAME}`;
  const html = `
    <p>Hello,</p>
    <p>${inviterDisplay} invited you to collaborate on <strong>${capsuleLabel}</strong> in ${SITE_NAME}.</p>
    ${shareBlock}
    <p>If you don't have an account yet, sign up with this email to see the shared project under <em>Shared with me</em>.</p>
    <p>— The ${SITE_NAME} team</p>
  `;
  const textShareBlock = options.shareUrl
    ? `Open the shared TimeCapsule: ${options.shareUrl}`
    : `Sign in at ${normalizedSite} to view projects shared with you.`;
  const text = [
    "Hello,",
    `${inviterDisplay} invited you to collaborate on ${capsuleLabel} in ${SITE_NAME}.`,
    textShareBlock,
    "If you don't have an account yet, sign up with this email to see the shared project under \"Shared with me.\"",
    `— The ${SITE_NAME} team`,
  ].join("\n\n");

  console.info(
    `[TimeCapsule] Sending invite email to ${options.recipient} for ${capsuleLabel}`
  );

  await resend.emails.send({
    from: "TimeCapsule Invites <notifications@bubblspace.com>",
    to: options.recipient,
    subject,
    html,
    text,
  });
}

