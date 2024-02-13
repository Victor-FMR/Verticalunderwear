import { Request, Response } from "express";
export declare const addShoppingcart: (req: Request, res: Response, id: string) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateShoppingcart: (req: Request, res: Response, id: string) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const dismShoppingcart: (req: Request, res: Response, id: string) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteShoppingcart: (req: Request, res: Response, id: string) => Promise<Response<any, Record<string, any>> | undefined>;
