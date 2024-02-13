<<<<<<< HEAD
import bcrypt from "bcrypt";
//import { Request } from "express";
import { logger } from "../logs/pino.logger";
=======
import bcrypt, { genSalt } from "bcrypt";
import { Request } from "express";
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2

export const hashpassword = async (pass: string) => {
  try {
    const hash = await bcrypt.hash(pass, 10);
    console.log({ message: "Contraseña Scryptada"});
    return hash;
  } catch (error) {
<<<<<<< HEAD
    return console.log("Error hashing password", error);
=======
    console.log("Error hashing password", error);
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2
  }
};

export const compare = async (check: string, hashpassword: string) => {
  try {
    const isOK = await bcrypt.compare(check, hashpassword);
<<<<<<< HEAD
    logger.info('Contraseña Correcta', isOK)
    //console.log("Contraseña Correcta Is:", isOK);
    return isOK;
  } catch (error) {
   return console.log("Error al comparar comtraseña", error);
=======
    console.log("Contraseña Correcta Is:", isOK);
    return isOK;
  } catch (error) {
    console.log("Error al comparar comtraseña", error);
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2
  }
};
