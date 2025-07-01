import { S3Client } from "@aws-sdk/client-s3";
require("dotenv").config();

const credentials = {
    accessKeyId: process.env.AWS_ACCESSKEYID ?? "",
    secretAccessKey: process.env.AWS_SECRETACCESSKEY ?? ""
};

const s3 = new S3Client({ region: process.env.AWS_REGION ?? "", credentials });

export function getAwsClient() {
    return s3;
}

export const getAwsInfo = {
    region: process.env.AWS_REGION ?? "",
    bucket: process.env.AWS_BUCKET ?? ""
};
