import { Request, Response } from "express";
export declare const createdAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const putAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
