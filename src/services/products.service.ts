import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";
const Prisma = new PrismaClient();

//obtener todos los productos
export const getProducts = async () => {
  const result = await Prisma.product.findMany({select: {idProduct: true,productName: true,description:true,price:true,image: true}});
  return result;
};

//obtener los productos por nombre
export const getProductsByName = async (req: Request) => {
  const nameProducts = req.params.name;
  const result = await Prisma.product.findMany({
    where: { productName: nameProducts },
  });
  return result;
};

//crear productos
export const createdProducts = async (req: Request) => {
  const { productName, description, price, stock, urlImage } = req.body;
  console.log(req.body);
  const newProduct = await Prisma.product.create({
    data: {
      productName: productName ,
      description: description ,
      price: price  ,
      stock: parseInt(stock),
      image: urlImage ,
    },
    
  });

  return newProduct;
};

//actualizar productos
export const updateProducts = async (req: Request, res: Response) => {
  const { id, productName } = req.params;
  try {
    const found = await Prisma.product.findUnique({ where: { idProduct: id } });

    if (!found) {
      return res.status(404).json({ message: "Product not found" });
    }
    const update = await Prisma.product.update({
      data: { productName: productName },
      where: { idProduct: id },
    });
    console.log({
      id: update.idProduct,
      name: update.productName,
      imagen: update.image,
    });
    return res.status(200).json({ message: "Producto Actualizado" });
  } catch (error) {
    return res.status(500).json({ message: "Error Interno del Servidor" });
  }
};

// const deletedProducts = (req: Request, res: Response) => {
//   const { id } = req.body;
//   try {
//   } catch (error) {}
// };
