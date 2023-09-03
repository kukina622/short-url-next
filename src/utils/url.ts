import crypto from "crypto";

export function generateRandomString(length = 6): string {
  return crypto.randomBytes(32).toString("base64url").slice(0, length);
}
