import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Prisma = new PrismaClient();

export const homeCtrl = async (_req: Request, res: Response) => {
  try {
    const Data = await Prisma.product.findMany({
      select: {
        idProduct: true,
        productName: true,
        price: true,
        imageUrl: true,
        
      },
    });

   return res.status(200).json({ message: "Enviado", Data });
  } catch (error) {
    console.log(error)
   return res.status(500).json('error por parte del servidor',)
  }
};

export const womenCtrl = ( _req:Request, res: Response) => {
  return res.status(200).json({ message: "Saludos desde Women" });
};

export const saleCtrl = (_req:Request,  res: Response) => {
 return  res.status(200).json({ message: "Saludos desde Sales" });
};
export const rewardsCtrl = (_req:Request,  res: Response) => {
 return  res.status(200).json({ message: "Saludos desde rewards" });
};
export const newCtrl = ( _req:Request, res: Response) => {
  return res.status(200).json({ message: "Saludos desde New" });
};

export const brandCtrl = ( _req:Request, res: Response) => {
  return res.status(200).json({ message: "Saludos desde Brands" });
};
export const accessoriesCtrl = ( _req:Request, res: Response) => {
  return res.status(200).json({ message: "Saludos desde accessories" });
};
export const youthCtrl = ( _req: Request,res: Response) => {
  return res.status(200).json({ message: "Saludos desde Youth" });
};

