import Jwt from "jsonwebtoken";
import { REFRESH_TOKEN, SECRET_TOKEN } from "../config";
import { logger } from "../logs/pino.logger"
export const generateAccessToken = (payload: any) => {
  try {
    const token = Jwt.sign(payload, SECRET_TOKEN, { expiresIn: "1D" });
    logger.info('Token Generado')
    //console.log({ message: "Token Generado"});
    //res.cookie('token', token)
    return token;
  } catch (error) {
    console.error("Error al generar token", error instanceof Error ? error.message: error);
    throw new Error("error al generar token");
  }
};

export const  generateRefreshToken=(paylodad: object)=>{
  try {
    const token =Jwt.sign(paylodad, REFRESH_TOKEN, { expiresIn: '30d' });

    return  token
  } catch (error) {
    console.error("Error al refrescar token", error instanceof Error ? error.message: error);
    throw new Error("error al refrescar token");
  }
 
}


export const verifyAccessToken = (payload: string, jwt: string) => {
  try {
    const verify = Jwt.verify(payload,jwt);

    console.log({message : "token de accesso verificado"});
    
    return verify
  } catch (error) {
    return console.error("Error al verififcar token", error instanceof Error ? error.message: error);
  }
};


export const verifyRefreshToken = (payload: string, jwt: string) => {
  try {
    const verify = Jwt.verify(payload,jwt);

    console.log({message : "token de actualizacion verificado"});
    
    return verify
  } catch (error) {
    return console.error("Error al verififcar token", error instanceof Error ? error.message: error);
  }
};




// export const decodedToken = (token : string, jwt: string) => {
//   try {
//     const decifrado = Jwt.decode(jwt);

//     console.log({message : "Token Decifrado"});
//     return decifrado;
//   } catch (error) {
//     console.error('error al decodificar token' ,error instanceof Error ? error.message: error)
//     throw new Error("No se pudo decodificar el token");
//   }
// };
