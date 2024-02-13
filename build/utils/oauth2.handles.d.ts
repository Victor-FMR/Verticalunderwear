import { NextFunction, Request, Response } from "express";
export declare const oAuth2: (req: Request, res: Response, next: NextFunction) => void;
export declare const isNotAuth2: (req: Request, res: Response, next: NextFunction) => void;
