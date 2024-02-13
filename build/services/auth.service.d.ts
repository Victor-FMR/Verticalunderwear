import { Request, Response } from "express";
export declare const registerNewUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | {
    token: string;
    user: {
        id: string;
        username: string;
    };
} | undefined>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
