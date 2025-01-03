import { Request, Response } from "express";
import {addShoppingcart, checkShoppingCart, dismShoppingcart,} from "../services/shoppingCart.service.js";



export const checkShoppingCartCtrl = async (req: Request, res: Response) => {
  try {
    const result = await checkShoppingCart(req, res);
      
    res.json({result})
    
  } catch (error) {}
};



export const addCartCtrl = async (req: Request, res: Response) => {
  try {
    await addShoppingcart(req, res);

    //res.status(201).json({message:'producto agregado al carrito', result});
  } catch (error) {}
};

// export const putCartCtrl = async (req: Request, res: Response) => {
//   try {
//     const result = await updateShoppingcart(req, res, req.params.id);
//     res.json({ message: "Carrito Actualizado", result });
//   } catch (error) {}
// };

export const dismiCartCtrl = async (req: Request, res: Response) => {
  try {
    const result = await dismShoppingcart(req, res);
    res.json(result);
  } catch (error) {}
};

// export const deleteCartCtrl = async (req: Request, res: Response) => {
//   try {
//     const result = await deleteShoppingcart(req, res, req.params.id);
//     res.json(result);
//   } catch (error) {}
// };
