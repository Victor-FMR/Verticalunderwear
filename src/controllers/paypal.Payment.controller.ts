import { Request, Response } from "express"
import {  capturePaymentOrder, createpaypalOrder,  getPaypalToken } from "../services/paypalPayment.service.js"
import { User } from "../interfaces/user.interface.js"

export const postPaypalTokenCtrl= async (_req: Request, res: Response) => {
    try {
         const result =await  getPaypalToken()
        return res.status(201).json(result)
    } catch (error) {
     return res.status(503).json({ message: "Error al obtener token de paypal" });
    }
  
}


export const postPaypalOrderCtrl= async (req: Request, res: Response) => {
    try {
        const userId= (req.user as User).id
        const result = await createpaypalOrder(userId)
        res.json(result)
    } catch (error) {
        
    }
   
}



// export const detailsPaypalOrderCtrl = async (req: Request, res: Response) => {
//     try {
//        // res.json('HOLA')
//        const result =  await detailsPaypalOrder(req,res)
//         res.json(result)
//     } catch (error) {
        
//     }
// }

export const capturePaymentOrderCtrl= async (req: Request, res: Response) => {
    try {
        const result = await capturePaymentOrder(req,res)
        res.json(result)
    } catch (error) {
        
    }
}
