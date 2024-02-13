import { Request, Response } from "express";
export declare const createdPaymentMethods: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPaymentMethods: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const putPaymentMethods: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletePaymentMethods: (req: Request, res: Response) => Promise<void>;
