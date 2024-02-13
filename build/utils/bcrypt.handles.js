import bcrypt from "bcrypt";
import { logger } from "../logs/pino.logger";
export const hashpassword = async (pass) => {
    try {
        const hash = await bcrypt.hash(pass, 10);
        console.log({ message: "Contraseña Scryptada" });
        return hash;
    }
    catch (error) {
        console.log("Error hashing password", error);
    }
};
export const compare = async (check, hashpassword) => {
    try {
        const isOK = await bcrypt.compare(check, hashpassword);
        logger.info('Contraseña Correcta', isOK);
        //console.log("Contraseña Correcta Is:", isOK);
        return isOK;
    }
    catch (error) {
        console.log("Error al comparar comtraseña", error);
    }
};
//# sourceMappingURL=bcrypt.handles.js.map