import { Request, Response } from "express";
import {
  createdPaymentMethods,
  getPaymentMethods,
  putPaymentMethods,
} from "../services/paymentMethods.service.js";

export const postUserPaymentMethodsCtrl = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createdPaymentMethods(req, res);
    res.json(result);
  } catch (error) {}
};

export const getUserPaymentMethodsCtrl = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getPaymentMethods(req, res);
    res.json(result);
  } catch (error) {}
};

export const putUserPaymentMethodsCtrl = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await putPaymentMethods(req, res);
    res.json(result);
  } catch (error) {}
};

export const deleteUserPaymentMethodsCtrl = async (
  req: Request,
  res: Response
) => {
  req.user;
  res.sendStatus(204);
};
