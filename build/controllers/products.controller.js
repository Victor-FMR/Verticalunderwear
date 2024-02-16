import { createdProducts, detailsProducts, getProducts, getProductsByName, updateProducts, } from "../services/products.service.js";
export const detailsProductsCtrl = async (req, res) => {
    try {
        const result = await detailsProducts(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
export const productsCtrl = async (res) => {
    const result = await getProducts();
    res.json(result);
};
export const getProductsByNameCtrl = async (req, res) => {
    const result = await getProductsByName(req);
    res.json(result).status(200);
};
export const createdProductsCtrl = async (req, res) => {
    const result = await createdProducts(req);
    res.json(result).status(200);
};
export const putProductsCtrl = async (req, res) => {
    try {
        await updateProducts(req, res);
        res.status(200).json({ message: 'Producto Actualizado Correctamente' });
    }
    catch (error) { }
};
