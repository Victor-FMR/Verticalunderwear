import { rateLimit } from "express-rate-limit";
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "Demasiados intentos,intentelo de nuevo dentro de 15 minutos",
    statusCode: 423,
});
