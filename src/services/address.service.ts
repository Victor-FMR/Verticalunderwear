import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { User } from "../interfaces/user.interface.js";

const Prisma = new PrismaClient();

export const createdAddress = async (req: Request, res: Response) => {
  const userId = req.user as User;

  const { country, street, state,city, zipcode,first_name, last_name,address_line_1,phone} = req.body;
  try {
    const maxAddress:number= 5

    const compareAdress = await Prisma.address.count({where:{userId: userId.id}})

    if(compareAdress >= maxAddress){
      return res.status(400).json({message: "Solo puedes tener 5 direcciones"})
    }

  

    const newAddress = await Prisma.address.create({
      data: {
        city: city,
        country: country,
        state: state,
        first_name: first_name,
        last_name: last_name,
        address_line_1: address_line_1,
        phone: phone,
        street: street,
        zipcode: zipcode,
        user: { connect: { id: userId.id } },

        //userId: userId.id,
      },
    });
     
    return res
      .status(201)
      .json({ message: "Direccion de Envio Creada con Exito", newAddress });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ message: "Error al Crear Direccion" });
  }
};

export const getAddress = async (req: Request, res: Response) => {
  const userId = req.user as User;
  try {
    const alladdress = await Prisma.address.findMany({
      where: { userId: userId.id },
      select: {
        idAddress: true,
        address_line_1: true,
        first_name: true,
        last_name:true,
        phone:true,
        state: true,
        country: true,
        city: true,
        zipcode: true,
        street: true,
      },
    });


    if(!alladdress){
      return res.status(404).json({message: "No hay Direcciones"})
    }
    
    return res
      .status(200)
      .json({ message: "Mostrando Todas las Direcciones", alladdress });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ message: "Error al Mostrar Direcciones" });
  }
};

export const putAddress = async (req: Request, res: Response) => {
  const { country, street, state,city, zipcode,address_line_1,phone,first_name,last_name } = req.body;

  const addressId = req.params.id;

  const userId = req.user as User;
  try {
    const foundAddress = await Prisma.address.findUnique({
      where: { idAddress: addressId },
    });

    if (!foundAddress) {
      return res.status(404).json({ message: "Direccion no encontrada" });
    }

    const updateAddress = await Prisma.address.update({
      where: { idAddress: addressId },
      data: {
        state: state,
        city: city,
        address_line_1: address_line_1,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        country: country,
        street: street,
        zipcode: zipcode,
        user: {connect: {id: userId.id}},
      },
    });
    return res.status(200).json({ message: "Direccion Actualizada", updateAddress });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al Actualizar Direccion" });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const addressId = req.params.id;
  const userId = req.user as User;
  try {
    const foundAddress = await Prisma.address.findUnique({
      where: { idAddress: addressId },
    });

    if (!foundAddress) {
      return res.status(404).json({ message: "Direccion no encontrada" });
    }

    const deleteAddress = await Prisma.address.delete({
      where: { idAddress: addressId ,userId: userId.id},
    });
    return res.status(200).json({ message: "Direccion Eliminada", deleteAddress });
  } catch (error) {
    console.log(error);
   return  res.status(500).json({ message: "Error al Eliminar Direccion" });
  }
};

//const getByAddress = (req: Request, res: Response) => {};

