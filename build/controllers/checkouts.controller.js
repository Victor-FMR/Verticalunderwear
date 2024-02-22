import { checkoutsInformation, checkoutsPayment, checkoutsShipping } from "../services/checkouts.service.js";
export const checkoutsInformationCtrl = async (req, res) => {
    try {
        const result = await checkoutsInformation(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
export const checkoutsShippingCtrl = async (req, res) => {
    try {
        const result = await checkoutsShipping(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
export const checkoutsPaymentCtrl = async (req, res) => {
    try {
        const userId = req.user.id;
        const { paymentMethod } = req.body;
        const result = await checkoutsPayment(userId, paymentMethod);
        res.status(202).json(result);
    }
    catch (error) {
        switch (error.message) {
            case 'Sesión de checkout no encontrada.':
                res.status(404).json({ error: error.message });
                break;
            case 'Carrito de compras no encontrado.':
                res.status(404).json({ error: error.message });
                break;
            case 'Método de pago no soportado':
                res.status(400).json({ error: error.message });
                break;
            default:
                // Para cualquier otro error, envía un mensaje genérico al cliente.
                res.status(500).json({ error: "Error al realizar el pago" });
                break;
        }
    }
};
// export const checkoutsInformationCtrl =async(req: Request ,res: Response)=>{
//     try {
//         const result = await checkoutsInformation(req,res)
//         res.json(result)
//     } catch (error) {
//     }
// }
