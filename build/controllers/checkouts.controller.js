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
        const result = await checkoutsPayment(req, res);
        res.json(result);
    }
    catch (error) {
    }
};
// export const checkoutsInformationCtrl =async(req: Request ,res: Response)=>{
//     try {
//         const result = await checkoutsInformation(req,res)
//         res.json(result)
//     } catch (error) {
//     }
// }
