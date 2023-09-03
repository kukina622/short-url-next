import crypto from "crypto";

export function generateRandomString(length = 6): string {
  return crypto.randomBytes(32).toString("base64url").slice(0, length);
}

export function isValidUrl(url: string): boolean {
  const regex =
    /^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/;

  return regex.test(url);
}
