import { PrismaClient } from "@prisma/client";
import { compare, hashpassword } from "../utils/bcrypt.handles.js";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.handles.js";
import { logger } from "../logs/pino.logger.js";
import { REFRESH_TOKEN, SECRET_TOKEN } from "../config.js";
const Prisma = new PrismaClient();
export const registerNewUser = async (req, res) => {
    try {
        const { username, lastname, email, password, confirmPassword } = req.body;
        const existingUser = await Prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser)
            return res.status(409).json({ message: "Email already in use" });
        if (password !== confirmPassword) {
            return res.status(401).json({ message: "las contraseñas no coinciden" });
        }
        //scritando contraseña
        const hashing = await hashpassword(password);
        const newUser = await Prisma.user.create({
            data: {
                username: username,
                lastname: lastname,
                email: email,
                password: hashing,
                roles: ["CLIENTE"],
                shoppingCarts: {
                    create: { quantity: 0, totalPrice: 0 },
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
    }
    catch (error) {
        logger.error("Error del Servidor");
        //console.log(error);
        return res.status(500).json({ message: "Error del Servidor" });
    }
    finally {
        await Prisma.$disconnect();
    }
};
export const login = async (req, res) => {
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
        const accessToken = generateAccessToken({ id: correct.id, name: correct.username, roles: correct.roles, lastanme: correct.lastname });
        const refreshToken = generateRefreshToken({ id: correct.id });
        // token de acceso verificado
        const verifyAccess = verifyAccessToken(accessToken, SECRET_TOKEN);
        const verifyRefresh = verifyRefreshToken(refreshToken, REFRESH_TOKEN);
        //envia los token al cliente 
        res.cookie("accessToken", accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            //sameSite: "none",
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            //sameSite: "none",
        });
        const user = { id: correct.id, name: correct.username };
        const data = { accessToken, refreshToken, user, verifyAccess, verifyRefresh };
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al Iniciar Sesion" });
    }
};
