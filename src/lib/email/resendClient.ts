import { Resend } from "resend";
import { isLocalServerEnv } from "@/lib/env";

let cachedResend: Resend | null | undefined;

export function getResendClient(): Resend | null {
  if (cachedResend !== undefined) {
    return cachedResend;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (apiKey) {
    cachedResend = new Resend(apiKey);
    return cachedResend;
  }

  if (isLocalServerEnv()) {
    console.warn(
      "RESEND_API_KEY is not set. Email features are disabled in local mode."
    );
    cachedResend = null;
    return cachedResend;
  }

  throw new Error(
    "RESEND_API_KEY environment variable is required for production deployments."
  );
}

export function isEmailDisabled(): boolean {
  return getResendClient() === null;
}
