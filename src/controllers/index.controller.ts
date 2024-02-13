import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const Prisma = new PrismaClient();

export const homeCtrl = async ( res: Response) => {
  try {
    const Data = await Prisma.product.findMany({
      select: {
        idProduct: true,
        productName: true,
        price: true,
        image: true,
        
      },
    });

   return res.status(200).json({ message: "Enviado", Data });
  } catch (error) {
    console.log(error)
   return res.status(500).json('error por parte del servidor',)
  }
};

export const womenCtrl = ( res: Response) => {
  return res.status(200).json({ message: "Saludos desde Women" });
};

export const saleCtrl = ( res: Response) => {
 return  res.status(200).json({ message: "Saludos desde Sales" });
};
export const rewardsCtrl = ( res: Response) => {
 return  res.status(200).json({ message: "Saludos desde rewards" });
};
export const newCtrl = ( res: Response) => {
  return res.status(200).json({ message: "Saludos desde New" });
};

export const brandCtrl = ( res: Response) => {
  return res.status(200).json({ message: "Saludos desde Brands" });
};
export const accessoriesCtrl = ( res: Response) => {
  return res.status(200).json({ message: "Saludos desde accessories" });
};
export const youthCtrl = ( res: Response) => {
  return res.status(200).json({ message: "Saludos desde Youth" });
};

