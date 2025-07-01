import { Request } from "express";
import { promises as fsPromises } from "fs";
import { diskStorage } from "multer";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const publicFolder = path.resolve(__dirname, "..", "..", "uploads");

const storage = diskStorage({
    destination: publicFolder,
    filename(req: Request, file, cb) {
        const { originalname } = file;
        const ext = path.extname(originalname);
        const name = path.basename(originalname, ext);
        const uniqueId = uuidv4();
        const fileName = `${name}_${uniqueId}${ext}`;
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"];

        if (!allowedExtensions.includes(ext.toLowerCase())) {
            return cb(new Error("A extensão do arquivo não é permitida"), "");
        }

        return cb(null, fileName);
    }
});

const uploadConfig = {
    storage: storage,
    limits: {
        fileSize: 52428800 // 50MB
    }
};

export default uploadConfig;

export async function processFileWeight(filePath: string) {
    try {
        const ext = path.extname(filePath).toLowerCase();

        if ([".jpg", ".jpeg", ".png"].includes(ext)) {
            const compressedPath = filePath.replace(/\.(jpg|jpeg|png)$/, ".webp");
            await sharp(filePath).resize(800).toFormat("webp").webp({ quality: 80 }).toFile(compressedPath);

            await fsPromises.unlink(filePath);
            return compressedPath;
        }

        return filePath;
    } catch (error) {
        console.error("Erro ao processar arquivo:", error);
        return filePath;
    }
}

export function listarConteudoPasta(folderPath: string): Promise<string[]> {
    return fsPromises.readdir(folderPath);
}

export function deletarArquivo(filePath: string): Promise<void> {
    return fsPromises.unlink(filePath);
}
