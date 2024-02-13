import { capturePaymentOrder, createpaypalOrder, detailsPaypalOrder, getPaypalToken } from "../services/paypalPayment.service";
export const postPaypalTokenCtrl = async (req, res) => {
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
export const detailsPaypalOrderCtrl = async (req, res) => {
    try {
        // res.json('HOLA')
        const result = await detailsPaypalOrder(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
export const capturePaymentOrderCtrl = async (req, res) => {
    try {
        const result = await capturePaymentOrder(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
//# sourceMappingURL=paypal.Payment.controller.js.map