
import { Response } from "express";

export const handlesHttp = (res : Response, error: string)=>{
    res.status(500).json({message: error})

}