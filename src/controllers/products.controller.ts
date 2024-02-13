import { Request, Response } from "express";
import {
  createdProducts,
  getProducts,
  getProductsByName,
  updateProducts,
} from "../services/products.service";

export const productsCtrl = async ( res: Response) => {
  const result = await getProducts();
  res.json(result);
};

export const getProductsByNameCtrl = async (req: Request, res: Response) => {
  const result = await getProductsByName(req);
  res.json(result).status(200);
};

export const createdProductsCtrl = async (req: Request, res: Response) => {
  const result = await createdProducts(req);
  res.json(result).status(200);
};

export const putProductsCtrl = async (req: Request, res: Response) => {
  try {
    await updateProducts(req, res);
    res.status(200).json({message: 'Producto Actualizado Correctamente'});
  } catch (error) {}
};

