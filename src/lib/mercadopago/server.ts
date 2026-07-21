import { MercadoPagoConfig, Preference, Payment as MPPayment } from "mercadopago";
import { mpAccessToken, WEBHOOK_URL, SITE_URL } from "./config";

const client = new MercadoPagoConfig({
  accessToken: mpAccessToken,
  options: { timeout: 10000 },
});

export const preferenceAPI = new Preference(client);
export const paymentAPI = new MPPayment(client);

export type CreatePreferenceInput = {
  items: { id: string; title: string; quantity: number; unit_price: number }[];
  externalReference: string;
};

export async function createPreference(input: CreatePreferenceInput) {
  const body = {
    items: input.items.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: "USD",
    })),
    external_reference: input.externalReference,
    notification_url: WEBHOOK_URL,
    back_urls: {
      success: `${SITE_URL}/cuenta/pedidos`,
      failure: `${SITE_URL}/checkout`,
      pending: `${SITE_URL}/checkout`,
    },
    auto_return: "approved" as const,
  };

  const preference = await preferenceAPI.create({ body });
  return {
    id: preference.id,
    initPoint: preference.init_point,
    sandboxInitPoint: preference.sandbox_init_point,
  };
}
