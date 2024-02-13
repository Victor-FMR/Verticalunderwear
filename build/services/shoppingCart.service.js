import { PrismaClient } from "@prisma/client";
import { createpaypalOrder } from "./paypalPayment.service";
const Prisma = new PrismaClient();
//NOTE - agregar producto al carrito de compras
export const addShoppingcart = async (req, res, id) => {
    const userId = req.user.id;
    try {
        // if (!req.body.userId) {
        //   return res.status(400).json({ message: "UserId is required" });
        // }
        const foundCarrito = await Prisma.shoppingCart.findUnique({
            where: { userId: userId }, include: { products: true }
        });
        if (!foundCarrito) {
            return res.status(404).json({ message: "El usuario no tiene carrito" });
        }
        //const foundProduct = await Prisma.shoppingCart.findUnique({where:{userId:userId},include:{products:{where:{idProduct: productId}}}})
        const product = await Prisma.product.findUnique({
            where: { idProduct: id }
        });
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        if (foundCarrito) {
            await Prisma.shoppingCart.update({
                where: { userId: userId },
                data: { products: { connect: [{ idProduct: id }] }, quantity: { increment: 1 }, totalPrice: { increment: product.price } },
            });
        }
        const actualizado = await Prisma.shoppingCart.findFirst({ where: { userId: userId }, include: { products: { select: { idProduct: true, productName: true, description: true, price: true, image: true } } } });
        const DATA = {
            userId: actualizado.userId,
            idShoppingCart: actualizado.idShoppingCart,
            products: actualizado.products,
            quantity: actualizado.quantity,
            totalPrice: actualizado.totalPrice,
        };
        return res.status(200).json({ message: 'Producto Agregado AL carrito', DATA });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al agregar producto al carrito" });
    }
};
//NOTE - aptualizar productos del carrito de compras 
export const updateShoppingcart = async (req, res, id) => {
    const userId = req.user.id;
    try {
        const foundCart = await Prisma.shoppingCart.findUnique({
            where: { userId: userId },
            include: { products: true },
        });
        const product = await Prisma.product.findUnique({ where: { idProduct: id } });
        if (!product) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        if (foundCart) {
            await Prisma.shoppingCart.update({
                where: { userId: userId },
                data: { quantity: { increment: 1 }, products: { connect: [{ idProduct: id }] }, totalPrice: { increment: product.price } },
            });
        }
        await createpaypalOrder(req, res);
        const actualizado = await Prisma.shoppingCart.findFirst({ where: { userId: userId }, include: { products: { select: { idProduct: true, productName: true, description: true, price: true, image: true } } } });
        const DATA = {
            userId: actualizado.userId,
            idShoppingCart: actualizado.idShoppingCart,
            products: actualizado.products,
            quantity: actualizado.quantity,
            totalPrice: actualizado.totalPrice,
        };
        return res.status(200).json({ message: 'Carrito Actualizado', DATA });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al actualizar Carrito", });
        console.log(error);
    }
};
//NOTE - disminuir productos del carrito de compras
export const dismShoppingcart = async (req, res, id) => {
    const userId = req.user.id;
    try {
        const foundCart = await Prisma.shoppingCart.findUnique({
            where: { userId: userId },
            include: { products: true },
        });
        const product = await Prisma.product.findUnique({ where: { idProduct: id } });
        if (!product) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        if (foundCart) {
            await Prisma.shoppingCart.update({
                where: { userId: userId },
                data: { quantity: { decrement: 1 }, products: { connect: [{ idProduct: id }] }, totalPrice: { decrement: product.price } },
            });
        }
        if (foundCart.quantity === 0) {
            await Prisma.shoppingCart.update({
                where: { userId: userId },
                data: { products: { disconnect: [{ idProduct: id }] } },
            });
        }
        const actualizado = await Prisma.shoppingCart.findFirst({ where: { userId: userId }, include: { products: { select: { idProduct: true, productName: true, description: true, price: true, image: true } } } });
        const DATA = {
            userId: actualizado.userId,
            idShoppingCart: actualizado.idShoppingCart,
            products: actualizado.products,
            quantity: actualizado.quantity,
            totalPrice: actualizado.totalPrice,
        };
        return res.status(200).json({ message: 'Producto Disminuido del Carrito', DATA });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al disminui Carrito" });
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
