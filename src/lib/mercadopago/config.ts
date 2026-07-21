export const mpAccessToken = process.env.MP_ACCESS_TOKEN!;
export const mpPublicKey = process.env.MP_PUBLIC_KEY!;

export const WEBHOOK_URL = process.env.WEBHOOK_URL
  ?? "https://gamexeco.vercel.app/api/mercado-pago/webhook";

export const SITE_URL = process.env.SITE_URL
  ?? "https://gamexeco.vercel.app";
