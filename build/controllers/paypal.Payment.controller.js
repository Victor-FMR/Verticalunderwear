import { capturePaymentOrder, createpaypalOrder, getPaypalToken } from "../services/paypalPayment.service.js";
export const postPaypalTokenCtrl = async (res) => {
    try {
        const result = await getPaypalToken(res);
        res.json(result);
    }
    catch (error) {
    }
};
export const postPaypalOrderCtrl = async (req, res) => {
    try {
        const result = await createpaypalOrder(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
// export const detailsPaypalOrderCtrl = async (req: Request, res: Response) => {
//     try {
//        // res.json('HOLA')
//        const result =  await detailsPaypalOrder(req,res)
//         res.json(result)
//     } catch (error) {
//     }
// }
export const capturePaymentOrderCtrl = async (req, res) => {
    try {
        const result = await capturePaymentOrder(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
