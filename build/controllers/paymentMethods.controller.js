import { createdPaymentMethods, getPaymentMethods, putPaymentMethods, } from "../services/paymentMethods.service";
export const postUserPaymentMethodsCtrl = async (req, res) => {
    try {
        const result = await createdPaymentMethods(req, res);
        res.json(result);
    }
    catch (error) { }
};
export const getUserPaymentMethodsCtrl = async (req, res) => {
    try {
        const result = await getPaymentMethods(req, res);
        res.json(result);
    }
    catch (error) { }
};
export const putUserPaymentMethodsCtrl = async (req, res) => {
    try {
        const result = await putPaymentMethods(req, res);
        res.json(result);
    }
    catch (error) { }
};
export const deleteUserPaymentMethodsCtrl = async (req, res) => {
    req.user;
    res.sendStatus(204);
};
