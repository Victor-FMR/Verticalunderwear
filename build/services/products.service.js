import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();
//obtener todos los productos
export const getProducts = async () => {
    const result = await Prisma.product.findMany({ select: { idProduct: true, productName: true, description: true, price: true, image: true } });
    return result;
};
//obtener los productos por nombre
export const getProductsByName = async (req) => {
    const nameProducts = req.params.name;
    const result = await Prisma.product.findMany({
        where: { productName: nameProducts },
    });
    return result;
};
//crear productos
export const createdProducts = async (req) => {
    const { productName, description, price, stock, urlImage } = req.body;
    console.log(req.body);
    const newProduct = await Prisma.product.create({
        data: {
            productName: productName,
            description: description,
            price: price,
            stock: parseInt(stock),
            image: urlImage,
        },
    });
    return newProduct;
};
//actualizar productos
export const updateProducts = async (req, res) => {
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
            id: update.id,
            name: update.productName,
            imagen: update.image,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error Interno del Servidor" });
    }
};
const deletedProducts = (req, res) => {
    const { id } = req.body;
    try {
    }
    catch (error) { }
};
//# sourceMappingURL=products.service.js.map