import { Request, Response } from "express";
export declare const registerCtrl: (req: Request, res: Response) => Promise<void>;
export declare const loginCtrl: (req: Request, res: Response) => Promise<void>;
export declare const logoutCtrl: (req: Request, res: Response) => Promise<void>;
export declare const refreshCtrl: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
