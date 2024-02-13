import { addShoppingcart, updateShoppingcart, dismShoppingcart } from "../services/shoppingCart.service";
export const addCartCtrl = async (req, res) => {
    try {
        await addShoppingcart(req, res, req.params.id);
        //res.status(201).json({message:'producto agregado al carrito', result});
    }
    catch (error) { }
};
export const putCartCtrl = async (req, res) => {
    try {
        const result = await updateShoppingcart(req, res, req.params.id);
        res.json({ message: "Carrito Actualizado", result });
    }
    catch (error) { }
};
export const dismiCartCtrl = async (req, res) => {
    try {
        const result = await dismShoppingcart(req, res, req.params.id);
        res.json(result);
    }
    catch (error) { }
};
// export const deleteCartCtrl = async (req: Request, res: Response) => {
//   try {
//     const result = await deleteShoppingcart(req, res, req.params.id);
//     res.json(result);
//   } catch (error) {}
// };
