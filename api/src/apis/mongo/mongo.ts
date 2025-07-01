import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "../../utils/log";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        logger.error(error);
    }
};
