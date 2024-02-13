import { registerSchema } from "../schemas/auth.schemas";
//import { ZodError } from "zod";
export const registerValidator = (req, res, next) => {
    try {
        registerSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json(error.issues[0].message);
    }
};
