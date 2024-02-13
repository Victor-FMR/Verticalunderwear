import { Request } from "express";
export declare const uploadFile: (req: Request) => Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
export declare const readFile: (filename: any) => Promise<import("@aws-sdk/client-s3").GetObjectCommandOutput>;
export declare const getFiles: () => Promise<import("@aws-sdk/client-s3").ListObjectsCommandOutput>;
