import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();
export const homeCtrl = async (res) => {
    try {
        const Data = await Prisma.product.findMany({
            select: {
                idProduct: true,
                productName: true,
                price: true,
                image: true,
            },
        });
        res.status(200).json({ message: "Enviado", Data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json('error por parte del servidor');
    }
};
export const womenCtrl = (res) => {
    res.status(200).json({ message: "Saludos desde Women" });
};
export const saleCtrl = (res) => {
    res.status(200).json({ message: "Saludos desde Sales" });
};
export const rewardsCtrl = (res) => {
    res.status(200).json({ message: "Saludos desde rewards" });
};
export const newCtrl = (res) => {
    res.status(200).json({ message: "Saludos desde New" });
};
export const brandCtrl = (res) => {
    res.status(200).json({ message: "Saludos desde Brands" });
};
export const accessoriesCtrl = (res) => {
    res.status(200).json({ message: "Saludos desde accessories" });
};
export const youthCtrl = (res) => {
    res.status(200).json({ message: "Saludos desde Youth" });
};
