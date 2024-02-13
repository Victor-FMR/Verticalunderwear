import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();
export const homeCtrl = async (_req, res) => {
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('error por parte del servidor');
    }
};
export const womenCtrl = (_req, res) => {
    return res.status(200).json({ message: "Saludos desde Women" });
};
export const saleCtrl = (_req, res) => {
    return res.status(200).json({ message: "Saludos desde Sales" });
};
export const rewardsCtrl = (_req, res) => {
    return res.status(200).json({ message: "Saludos desde rewards" });
};
export const newCtrl = (_req, res) => {
    return res.status(200).json({ message: "Saludos desde New" });
};
export const brandCtrl = (_req, res) => {
    return res.status(200).json({ message: "Saludos desde Brands" });
};
export const accessoriesCtrl = (_req, res) => {
    return res.status(200).json({ message: "Saludos desde accessories" });
};
export const youthCtrl = (_req, res) => {
    return res.status(200).json({ message: "Saludos desde Youth" });
};
