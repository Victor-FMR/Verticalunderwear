import { Request, Response } from "express";
export declare const postPaypalTokenCtrl: (req: Request, res: Response) => Promise<void>;
export declare const postPaypalOrderCtrl: (req: Request, res: Response) => Promise<void>;
export declare const detailsPaypalOrderCtrl: (req: Request, res: Response) => Promise<void>;
export declare const capturePaymentOrderCtrl: (req: Request, res: Response) => Promise<void>;
