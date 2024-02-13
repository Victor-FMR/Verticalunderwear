import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

<<<<<<< HEAD
import { compare, hashpassword } from "../utils/bcrypt.handles";
import {  generateAccessToken,   generateRefreshToken, verifyAccessToken, verifyRefreshToken} from "../utils/jwt.handles";
import { logger } from "../logs/pino.logger";
import { REFRESH_TOKEN, SECRET_TOKEN } from "../config";
=======
import { user } from "../interfaces/user.interface";
import { compare, hashpassword } from "../utils/bcrypt.handles";
import {  generateToken, verifyToken } from "../utils/jwt.handles";
import { JWT } from "../config";
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2

const Prisma = new PrismaClient();

export const registerNewUser = async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
    const { username, lastname, email, password, confirmPassword } = req.body;
=======
    const { username, lastname, email, password } = req.body;
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2

    const existingUser = await Prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser)
      return res.status(409).json({ message: "Email already in use" });

<<<<<<< HEAD
    if (password !== confirmPassword) {
      return res.status(401).json({ message: "las contraseñas no coinciden" });
    }

=======
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2
    //scritando contraseña
    const hashing = await hashpassword(password);

    const newUser = await Prisma.user.create({
      data: {
        username: username,
        lastname: lastname,
        email: email,
        password: hashing as string,
<<<<<<< HEAD
        roles: ["CLIENTE"],
        shoppingCarts: {
          create: {quantity: 0, totalPrice: 0},
        },
      },
    });

    const user = {
      id: newUser.id,
      username: newUser.username,
    };

    logger.info("Usuario Registrado");
    //console.log({message : 'Usuario Registrado'})
    //token del usuario
    const token = generateAccessToken({ id: newUser.id });
    //await Prisma.session.create({data:{userId: newUser.id, token: token}})
    res.cookie("token", token);
    //req.user = co
    const data = { token, user };

    return data;
  } catch (error) {
    logger.error("Error del Servidor");
    //console.log(error);
    return res.status(500).json({ message: "Error del Servidor" });
  } finally {
    await Prisma.$disconnect();
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    
    const correct = await Prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!correct) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isCorrect = await compare(req.body.password, correct.password);
    if (!isCorrect) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }


    //genera el tokens, Token de acceso|  Refresh Token
    const accessToken = generateAccessToken({ id: correct.id, name: correct.username, roles: correct.roles, lastanme: correct.lastname});
    const refreshToken = generateRefreshToken({ id: correct.id });


    // token de acceso verificado
    const verifyAccess = verifyAccessToken(accessToken, SECRET_TOKEN);
    const verifyRefresh = verifyRefreshToken(refreshToken, REFRESH_TOKEN);
     
   
  //envia los token al cliente 
    res.cookie("accessToken", accessToken,{
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      //sameSite: "none",
    });

    res.cookie("refreshToken", refreshToken,{
      maxAge:  30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      //sameSite: "none",
    });
 
    const user = { id: correct.id, name: correct.username };
     
  
    const data = { accessToken,refreshToken,user, verifyAccess,verifyRefresh };
    
    return  res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: "Error al Iniciar Sesion" });
  }
};
=======
      },
    });
    
    console.log({message : 'Usuario Registrado'})
    //token del usuario
    const token = generateToken({ id: newUser.id });
    await Prisma.session.create({data:{userId: newUser.id, token: token}})
    res.cookie('token', token)
   const data = {token, newUser}
   
    return data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del Servidor" });
  }finally{
    await Prisma.$disconnect()
  }
};



export const login=async (req: Request, res: Response)=>{
  try {

    const correct = await Prisma.user.findUnique({where: {email: req.body.email}})

  if(!correct){
    return res.status(404).json({message: 'Usuario no encontrado'})
  }

  const isCorrect= await compare(req.body.password,correct.password)
  if(!isCorrect){
    return res.status(401).json({message: 'Contraseña incorrecta'})
  }

  console.log({message: 'Usuario Inicio Sesion '})
   //genera el token
  const token = generateToken({id : correct.id})
   
   //await Prisma.session.create({data :{userId: correct.id,token: token as string}})
  
  //devuelve los datos del usuario y el token verificado
    const verify = verifyToken(token, JWT)
    res.cookie('Token', token)

   const data = {token, correct, verify}
  
    
   return data
  } catch (error) {
    res.status(500).json({message: 'Error del servidor'})
  }
   
  

}


export const logout=async (req:Request, res: Response)=>{

  res.clearCookie("Token")
  return res.sendStatus(200)
} 
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2
