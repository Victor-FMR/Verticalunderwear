// import { PrismaClient } from "@prisma/client";

// import { Request, Response } from "express";
// import { User } from "../interfaces/user.interface";
// const Prisma = new PrismaClient();


// export const createOrder = async (req: Request, res: Response) => {
//   const userId = (req.user as User).id
//   const {  addressId, paymentMethod, totalAmount, orderItems } = req.body;
  
//     try {
        

//         // Primero, verifica que la dirección de envío pertenezca al usuario
//     const address = await Prisma.address.findFirst({
//       where: {
//         idAddress: addressId,
//         userId: userId, // Asegura que la dirección pertenece al usuario
//       },
//     });
      
      
//     if (!address) {
//       return res.status(404).json({ message: "Dirección de envío no encontrada o no pertenece al usuario." });
//     }

//       Prisma.address.create({data: {user: {connect: {id: userId}},}})

//         const newOrder = await Prisma.order.create({
//             data: {

//               userId:userId,
//               addressId: addressId ,
//               orderNumber: generateOrderNumber(), // Suponiendo que tienes una función para generar esto
//               totalAmount: totalAmount,
//               paymentMethod: paymentMethod,
//               status: 'PENDING',
              
             
//               // No añades aún los orderItems aquí, eso viene después
//             }
//           }
//         );
          

//     } catch (error) {
        
//     }
// }