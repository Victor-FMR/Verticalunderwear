import { verifyAccessToken } from "../utils/jwt.handles";
import { SECRET_TOKEN } from "../config";
//import { JwtPayload } from "../interfaces/user.interface";
export const checkAuthorization = (req, res, next) => {
    const token = req.cookies.accessToken;
    try {
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        const verify = verifyAccessToken(token, SECRET_TOKEN);
        if (!verify) {
            return res.status(401).send("Invalid Token OR Expired");
        }
        // Verificación de tipos para informar a TypeScript sobre la propiedad 'id'
        //  if (typeof verify === 'string') {
        //   return res.status(403).send("Invalid Token OR Expired");
        // }
        req.user = verify;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'sesion no valida' });
    }
};
