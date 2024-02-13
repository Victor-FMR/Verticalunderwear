import z from "zod";
export const registerSchema = z.object({
    username: z
        .string({ required_error: "Username is Required" })
        .min(4, { message: "minimo 4 letras" })
        .max(16, { message: "maximo 16 letras" }),
    lastname: z
        .string({ required_error: "lastname is Required" })
        .min(3, { message: "minimo 3 caracter" })
        .max(16, { message: "maximo 16 caracter" })
        .trim()
        .toUpperCase(),
    email: z
        .string({ required_error: "Email is Required" })
        .email({ message: "Invalid Email" })
        .trim(),
    password: z.string({ required_error: "Password is Required" }).min(8, { message: "Passwors the 8 caracter minimun" })
});
//# sourceMappingURL=auth.schemas.js.map