import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./apis/mongo/mongo";
import routes from "./routes";
import { initialPathRoutePublic } from "./utils/const";
import { logger } from "./utils/log";
import { ReceiveMercadoPagoWebhook } from "./webhook/mercadoPagoWebhook";

dotenv.config();

export const app = express();

app.use(express.json());

app.post(`${initialPathRoutePublic}/mercadopago/receive`, ReceiveMercadoPagoWebhook);

app.use(
    cors({
        origin: process.env.FRONT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(routes);

const startServer = async () => {
    await connectDB();

    app.listen(8000, () => {
        console.log("Servidor rodando na porta 8000");
    });
};

startServer().catch((error) => {
    console.error("Erro ao iniciar o servidor:", error);
    logger.error(error);
});
