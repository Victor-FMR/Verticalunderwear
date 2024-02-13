import { Request, Response } from "express";
import { login, registerNewUser } from "../services/auth.service.js";

import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.handles.js";
import { REFRESH_TOKEN } from "../config.js";
import { User } from "../interfaces/user.interface.js";

export const registerCtrl = async (req: Request, res: Response) => {
  try {
     await registerNewUser(req, res);
    
  } catch (error) {}
};

export const loginCtrl = async (req: Request, res: Response) => {
  try {
    const userLogin = await login(req, res);
    res.status(201).json(userLogin);
  } catch (error) {}
};

export const logoutCtrl = async ( res: Response) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.status(200).json({message: 'cerro sesion'})
  
};

export const refreshCtrl = async (req: Request, res: Response) => {

  try {
  
    const  refreshToken = req.cookies.refreshToken;
       
    const verifyRefresh = verifyRefreshToken(refreshToken,REFRESH_TOKEN) as User

      
    if(!verifyRefresh){
      return res.status(401).json({ message: 'Token de actualización inválido' });
    }


    const newAccessToken = generateAccessToken({id: verifyRefresh.id})

    res.cookie('accessToken', newAccessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: 'none',
    });

    return res.status(200).json({ message: 'Token de acceso renovado con éxito' });
  //  res.status(200)

  } catch (error) {
    console.error('Error al renovar el token:', error);
    return res.status(500).json({ message: 'Error al renovar el token' });
  }
}
