import dotenv from "dotenv";
import { MercadoPagoConfig } from "mercadopago";

dotenv.config();

const mpClientClient = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string
});

export default mpClientClient;
