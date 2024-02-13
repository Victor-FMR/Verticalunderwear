import { Request, Response } from "express";
export declare const getProducts: () => Promise<{
    idProduct: string;
    productName: string;
    description: string;
    price: import("@prisma/client/runtime/library").Decimal;
    image: string;
}[]>;
export declare const getProductsByName: (req: Request) => Promise<{
    idProduct: string;
    productName: string;
    description: string;
    stock: number | null;
    price: import("@prisma/client/runtime/library").Decimal;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    shoppingCartId: string | null;
}[]>;
export declare const createdProducts: (req: Request) => Promise<{
    idProduct: string;
    productName: string;
    description: string;
    stock: number | null;
    price: import("@prisma/client/runtime/library").Decimal;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    shoppingCartId: string | null;
}>;
export declare const updateProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
