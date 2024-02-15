import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {  User } from "../interfaces/user.interface.js";

const Prisma = new PrismaClient();



//NOTE - agregar producto al carrito de compras
export const addShoppingcart = async (req: Request, res: Response,) => {
  const { productId, quantity } = req.body;
  const userId = (req.user as User).id 


  try {
    
        // Suponemos que el carrito ya existe gracias al registro de usuarios
        const carrito = await Prisma.shoppingCart.findUnique({
          where: {
            userId:userId
          },
        });
    
        if (!carrito) {
          // Este caso idealmente no debería ocurrir si todos los usuarios registrados tienen un carrito
          return res.status(404).json('Carrito no encontrado. Asegúrate de que el usuario esté registrado correctamente.',);
        }
    
        // Obtener el precio del producto
        const producto = await Prisma.product.findUnique({
          where: {
            idProduct: productId,
          },
        });
    
        if (!producto) {
          return res.status(404).json('Producto no encontrado');
        }
    
        // Verificar si el producto ya está en el carrito
        const itemExistente = await Prisma.cartItem.findFirst({
          where: {
            shoppingCartId: carrito.idShoppingCart,
            productId: productId,
          },
        });
    
        if (itemExistente) {
          // Si ya existe, actualizar la cantidad
          await Prisma.cartItem.update({
            where: {
              idCartItem: itemExistente.idCartItem,
            },
            data: {
              quantity: itemExistente.quantity + Number(quantity),
            },
          });
        } else {
          // Si no, añadir el producto al carrito
          await Prisma.cartItem.create({
            data: {
              shoppingCartId: carrito.idShoppingCart,
              productId: productId,
              quantity: Number(quantity),
              priceAtAdd: producto.price,
            },
          });
        }
    
        // Actualizar la cantidad y el precio total del carrito
        await Prisma.shoppingCart.update({
          where: {
            idShoppingCart: carrito.idShoppingCart,
          },
          data: {
            quantity: {
              increment:Number (quantity),
            },
            totalPrice: {
              increment: Number(producto.price) * quantity,
            },
          },
        });
    

    return res.status(200).json('Producto agregado al carrito con éxito');
  } catch (error) {
    console.error('Error al agregar producto al carrito: ', error);
   return res.status(500).json('Error al agregar producto al carrito');
  }
}
  


//NOTE - aptualizar productos del carrito de compras 
// export const updateShoppingcart = async (req: Request, res: Response, id : string) => {
  
//   const userId = (req.user as User).id;

//   try {
//     const foundCart = await Prisma.shoppingCart.findUnique({
//       where: { userId: userId },
//       include: { products: true },
//     });
      


//       const product = await Prisma.product.findUnique({where : {idProduct: id}})

//       if(!product){
//         return res.status(404).json({message:"producto no encontrado"})
//       }


//     if (foundCart) {
//       await Prisma.shoppingCart.update({
//         where: { userId: userId },
//         data: { quantity: { increment: 1 },products:{connect:[{idProduct:id}]},totalPrice:{increment:product.price} },
//       });
//     }

 

//      await createpaypalOrder(req,res)
 
//     const actualizado = await Prisma.shoppingCart.findFirst({where: {userId: userId},include:{products: {select:{idProduct: true,productName: true, description: true, price:true,image: true}}}})
  
    
//     const DATA= {
//       userId : actualizado!.userId,
//       idShoppingCart: actualizado!.idShoppingCart,
//       products: actualizado!.products,
//       quantity: actualizado!.quantity,
//       totalPrice: actualizado!.totalPrice,
      
//     }
   
    
//     return res.status(200).json({message: 'Carrito Actualizado', DATA})
//   } catch (error) {
//     return res.status(500).json({ message: "Error al actualizar Carrito",})
//     console.log(error);
//   }
// };


//NOTE - disminuir productos del carrito de compras
export const dismShoppingcart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body; // Cantidad a disminuir
  const userId = (req.user as User).id // ID del usuario autenticado

  try {
    // Verificar la existencia del carrito del usuario
    const carrito = await Prisma.shoppingCart.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!carrito) {
      return res.status(404).json('Carrito no encontrado. Asegúrate de que el usuario esté registrado correctamente.');
    }

    // Verificar la existencia del producto en el carrito
    const itemExistente = await Prisma.cartItem.findFirst({
      where: {
        shoppingCartId: carrito.idShoppingCart,
        productId: productId,
      },
    });

    if (!itemExistente) {
      return res.status(404).json('Producto no encontrado en el carrito');
    }

    // Decidir si actualizar la cantidad o eliminar el item basado en la nueva cantidad
    if (itemExistente.quantity > quantity) {
      // Actualizar la cantidad del producto en el carrito si después de disminuir es mayor a cero
      await Prisma.cartItem.update({
        where: {
          idCartItem: itemExistente.idCartItem,
        },
        data: {
          quantity: itemExistente.quantity - Number(quantity),
        },
      });
    } else {
      // Eliminar el producto del carrito si la cantidad a disminuir es igual o mayor a la existente
      await Prisma.cartItem.delete({
        where: {
          idCartItem: itemExistente.idCartItem,
        },
      });
    }



    let totalPrice = 0;
    let totalQuantity = 0;

     // Recalcular totalPrice y totalQuantity después de modificar el carrito
     const updatedCartItems = await Prisma.cartItem.findMany({
      where: { shoppingCartId: carrito.idShoppingCart },
    });
    

       // Usar bucle para calcular los totales
       for (const item of updatedCartItems) {
        totalPrice += Number(item.priceAtAdd) * item.quantity;
        totalQuantity += item.quantity;
      }


       // Actualizar el carrito con los nuevos totales
    await Prisma.shoppingCart.update({
      where: { idShoppingCart: carrito.idShoppingCart },
      data: { totalPrice, quantity: totalQuantity },
    });

    // Opcional: Recalcular y actualizar el totalPrice y la quantity total del carrito aquí, similar al proceso de adición

    return res.status(200).json('Producto actualizado o eliminado del carrito con éxito');
  } catch (error) {
    console.error('Error al actualizar el carrito: ', error);
    return res.status(500).json('Error al actualizar el carrito');
  }


};


// export const deleteShoppingcart = async (req: Request, res: Response, id: string) => {

//   const userId = (req.user as User).id
//   try {
//     const foundCart = await Prisma.shoppingCart.findUnique({
//       where: { userId: userId},
//       include: { products: true},
//     });

//     const product = await Prisma.product.findUnique({where: {idProduct: id}})
    
    
//     if(!product){
//       return res.status(404).json({message:"producto no encontrado"})
//     }
    
     
//     if (foundCart) {
//       const priceToRemove = Math.min(product.price, foundCart.totalPrice)
//       await Prisma.shoppingCart.update({
//         where: { userId: userId },
//         data: { 
//           quantity:Math.max(foundCart.quantity - 1, 0), 
//           totalPrice: Math.max(foundCart.totalPrice * priceToRemove, 0),
//           products:{disconnect: [{idProduct: id}]}},
//       });
//     } 

//     const actualizado = await Prisma.shoppingCart.findFirst({where: {userId: userId},include:{products: {select:{idProduct: true,productName: true, description: true, price:true,image: true}}}})
  
    
//     const DATA= {
//       userId : actualizado.userId,
//       idShoppingCart: actualizado.idShoppingCart,
//       products: actualizado.products,
//       quantity: actualizado.quantity,
//       totalPrice: actualizado.totalPrice,
      
//     }
//     return res.status(200).json({message: 'Producto Eliminado del Carrito', DATA})
//   } catch (error) {
//     console.log(error);
//   }
// };


