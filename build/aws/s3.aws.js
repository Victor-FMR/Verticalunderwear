//import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsCommand, } from "@aws-sdk/client-s3";
import { AWS_ID_PUBLIC_KEY, AWS_ID_SECRET_KEY, AWS_NAME_BUCKET, AWS_PUBLIC_REGION } from "../config.js";
const client = new S3Client({
    region: AWS_PUBLIC_REGION,
    credentials: {
        accessKeyId: AWS_ID_PUBLIC_KEY,
        secretAccessKey: AWS_ID_SECRET_KEY,
    },
});
export const uploadFile = async (req) => {
    const command = new PutObjectCommand({ Bucket: AWS_NAME_BUCKET, Key: req.file?.originalname + '-' + Date.now(), Body: req.file?.buffer });
    return await client.send(command);
};
export const readFile = async (filename) => {
    const command = new GetObjectCommand({ Bucket: AWS_NAME_BUCKET, Key: filename });
    return await client.send(command);
};
export const getFiles = async () => {
    const command = new ListObjectsCommand({ Bucket: AWS_NAME_BUCKET });
    return await client.send(command);
};
