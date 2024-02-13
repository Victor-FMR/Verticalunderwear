import z from "zod";
export declare const registerSchema: z.ZodObject<{
    username: z.ZodString;
    lastname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
    lastname: string;
}, {
    username: string;
    password: string;
    email: string;
    lastname: string;
}>;
