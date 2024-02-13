import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();
export const database = async () => {
    try {
        await Prisma.$connect().then(() => {
            console.log("***DATABASES CONECTION***");
        });
    }
    catch (error) {
        console.log('error al conectar con la basedatos', error);
    }
};
//# sourceMappingURL=database.js.map