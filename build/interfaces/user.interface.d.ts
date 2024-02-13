export interface user {
    firstName: String;
    lastName: String;
    email: String;
    phoneNumber: String;
    password: String;
    isActive: boolean;
}
export interface User {
    id: string;
    name: string;
    roles: string[];
    email: string;
}
export interface JwtPayload {
    id: string;
}
