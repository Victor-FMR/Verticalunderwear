
import { Request, Response } from "express";
import { createdAddress, deleteAddress, getAddress, putAddress } from "../services/address.service.js";

export const postAddressCtrl = async (req: Request, res: Response) => {
  try {
    const result = await createdAddress(req, res);
    res.json(result);
  } catch (error) {}
};
export const getAddressCtrl = async (req: Request, res: Response) => {
  try {
    const result = await getAddress(req, res);
    res.json(result);
  } catch (error) {}
};


export const putAddressCtrl = async (req: Request, res: Response) => {
  try {
    const result = await putAddress(req, res);
    res.json(result);
  } catch (error) {}
};

export const deleteAddressCtrl = async (req: Request, res: Response) => {
  try {
    const result = await deleteAddress(req, res);
    res.json(result);
  } catch (error) {}
};