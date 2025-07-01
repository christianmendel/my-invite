import { NextFunction, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";

export const SingleUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const multerMiddleware = multer(uploadConfig).single("file");

    multerMiddleware(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({ error: "O arquivo excede o limite de 5MB." });
                }
            }
            return res.status(500).json({ error: "Erro ao fazer o upload do arquivo." });
        }
        next();
    });
};

export const MultipleUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const multerMiddleware = multer(uploadConfig).array("files");

    multerMiddleware(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({ error: "O arquivo excede o limite de 5MB." });
                }
            }
            return res.status(500).json({ error: "Erro ao fazer o upload do arquivo." });
        }
        next();
    });
};
