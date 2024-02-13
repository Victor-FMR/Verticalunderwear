import { registerSchema } from "../schemas/auth.schemas";
export const registerValidator = (req, res, next) => {
    try {
        registerSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json(error.issues[0].message);
    }
};
//# sourceMappingURL=auth.schema.middleware.js.map