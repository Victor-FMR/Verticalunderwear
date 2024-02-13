import { Request, Response } from "express";
export declare const getPaypalToken: (res: Response) => Promise<any>;
export declare const createpaypalOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const detailsPaypalOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const capturePaymentOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
