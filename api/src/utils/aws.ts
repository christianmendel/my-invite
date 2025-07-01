import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import { Readable } from "stream";
import { getAwsClient, getAwsInfo } from "../apis/aws/aws";
import { deletarArquivo } from "../config/upload";
import { logger } from "./log";

export async function InsertFileAwsInternal(path: string, pathAws: string): Promise<string | undefined> {
    try {
        const fileStream = fs.createReadStream(path);

        const upload = new Upload({
            client: getAwsClient(),
            params: {
                Bucket: getAwsInfo.bucket,
                Key: `${pathAws}`,
                Body: Readable.from(fileStream)
            }
        });

        const result = await upload.done();

        await deletarArquivo(path);

        return result.Key;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

export async function FindFileAwsUrlInternal(pathAws: string): Promise<string> {
    try {
        const downloadParams = {
            Bucket: getAwsInfo.bucket,
            Key: `${pathAws}`
        };

        const signedUrl = await getSignedUrl(getAwsClient(), new GetObjectCommand(downloadParams), {
            expiresIn: 60 * 5
        });

        return signedUrl;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

export async function FindFileAwsPublicUrlInternal(key: string): Promise<string> {
    try {
        return `https://${getAwsInfo.bucket}.s3.amazonaws.com/${key}`;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

export async function DeleteFileAwsInternal(pathAws: string) {
    try {
        const deleteParams = {
            Bucket: getAwsInfo.bucket,
            Key: `${pathAws}`
        };

        await getAwsClient().send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
