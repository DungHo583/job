import crypto from "crypto";

export function hashMD5(input: string) {
  return crypto.createHash("md5").update(input).digest("hex");
}