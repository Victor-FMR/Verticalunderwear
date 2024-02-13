import { NextFunction, Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schemas";
//import { ZodError } from "zod";

export const registerValidator= (req: Request, res: Response, next: NextFunction)=>{
     try {
         registerSchema.parse(req.body)
         next()
     } catch (error: any) {
        res.status(400).json(error.issues[0].message)
     }
}
