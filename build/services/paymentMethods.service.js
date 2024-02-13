import { PrismaClient } from "@prisma/client";
import { hashpassword } from "../utils/bcrypt.handles";
const Prisma = new PrismaClient();
export const createdPaymentMethods = async (req, res) => {
    const userId = req.user;
    const { numeroTarjeta, nombreTitular, monthVencimiento, yearVencimiento, codigoSeguridad, descripcion, } = req.body;
    try {
        const foundPayment = await Prisma.paymentMethods.findUnique({
            where: { numeroTarjeta: numeroTarjeta },
        });
        const maxPaymentMethods = 3; //Cantidad maxima de tarjetas que un usuario puede tener
        const comparePayment = await Prisma.paymentMethods.count({
            where: { userId: userId.id },
        });
        if (comparePayment > maxPaymentMethods) {
            return res.status(400).json({ message: "Maximo de direcciones" });
        }
        if (foundPayment) {
            return res.status(400).json({ message: "El Metodo de Pago ya Existe" });
        }
        //encriptando claves
        const numberScript = await hashpassword(numeroTarjeta);
        const monthScript = await hashpassword(monthVencimiento);
        const yearScript = await hashpassword(yearVencimiento);
        const codeScript = await hashpassword(codigoSeguridad);
        const newPaymentMethod = await Prisma.paymentMethods.create({
            data: {
                numeroTarjeta: numberScript,
                nombreTitular: nombreTitular,
                monthVencimiento: monthScript,
                yearVencimiento: yearScript,
                codigoSeguridad: codeScript,
                descripcion: descripcion,
                user: { connect: { id: userId.id } },
            },
        });
        return res.status(201).json({
            message: "Metodo de Pago Creado Correctamente",
            newPaymentMethod,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al Crear un Metodo de Pago" });
    }
};
export const getPaymentMethods = async (req, res) => {
    const userId = req.user;
    try {
        const paymentMethods = await Prisma.paymentMethods.findMany({
            where: { user: { id: userId.id } },
            select: {
                id_paymentMethod: true,
                numeroTarjeta: true,
                nombreTitular: true,
                yearVencimiento: true,
                monthVencimiento: true,
                codigoSeguridad: true,
                updatedAt: true,
            },
        });
        if (!paymentMethods) {
            return res.status(400).json({ message: "No hay Metodos de Pago" });
        }
        return res.status(200).json({ message: "Metodos de Pago", paymentMethods });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al Obtener Metodos de Pago" });
    }
};
export const putPaymentMethods = async (req, res) => {
    const userId = req.user;
    const { numeroTarjeta, nombreTitular, yearVencimiento, monthVencimiento, codigoSeguridad, descripcion } = req.body;
    const paymentId = req.params.id;
    try {
        const foundPayment = await Prisma.paymentMethods.findUnique({ where: { id_paymentMethod: paymentId } });
        if (!foundPayment) {
            return res.status(404).json({ message: "No se Encontro Metodo de Pago" });
        }
        //encriptando claves
        const numberScript = await hashpassword(numeroTarjeta);
        const monthScript = await hashpassword(monthVencimiento);
        const yearScript = await hashpassword(yearVencimiento);
        const codeScript = await hashpassword(codigoSeguridad);
        const updatedPaymentMethods = await Prisma.paymentMethods.update({
            where: { id_paymentMethod: paymentId, user: { id: userId.id } },
            data: {
                nombreTitular: nombreTitular,
                numeroTarjeta: numberScript,
                yearVencimiento: yearScript,
                monthVencimiento: monthScript,
                codigoSeguridad: codeScript,
                descripcion: descripcion
                //user: { connect: { id: userId.id } },
            },
        });
        return res.status(202).json({ message: "Metodo de Pago Actualizado", updatedPaymentMethods });
    }
    catch (error) {
        console.log("ERROR AL ACTUALIZAR EL METODO DE", error);
        return res.status(500).json({ message: "Error al Actualizar Metodo de Pago" });
    }
};
//export const deletePaymentMethods = async (req: Request, res: Response) => {};
