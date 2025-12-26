import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const secret = process.env.NEXT_PUBLIC_COOKIE_SECRET_KEY;
if (!secret) {
  throw new Error("COOKIE_SECRET_KEY не найден! Добавь его в .env");
}

const SECRET_KEY = Buffer.from(secret, "hex");
const IV_LENGTH = 16;

export function encryptToken(token: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptToken(encrypted: string) {
  const [ivHex, encryptedData] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
