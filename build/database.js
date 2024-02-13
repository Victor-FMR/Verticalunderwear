import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();
export const database = async () => {
    try {
        await Prisma.$connect().then(() => {
            console.log("***DATABASES CONECTION***");
        });
    }
    catch (error) {
        console.log('Error al conectar con la Basedatos', error);
    }
};
