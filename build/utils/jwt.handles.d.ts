import Jwt from "jsonwebtoken";
export declare const generateAccessToken: (payload: any) => string;
export declare const generateRefreshToken: (paylodad: object) => string;
export declare const verifyAccessToken: (payload: string, jwt: string) => string | Jwt.JwtPayload | undefined;
export declare const verifyRefreshToken: (payload: string, jwt: string) => string | Jwt.JwtPayload | undefined;
