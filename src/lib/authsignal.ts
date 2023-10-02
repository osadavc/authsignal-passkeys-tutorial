import { Authsignal } from "@authsignal/node";

const secret = process.env.AUTHSIGNAL_SECRET;

if (!secret) {
  throw new Error("AUTHSIGNAL_SECRET is undefined");
}

const apiBaseUrl = process.env.NEXT_PUBLIC_AUTHSIGNAL_API_BASE_URL;
const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/callback`;

export const authsignal = new Authsignal({ secret, apiBaseUrl, redirectUrl });
