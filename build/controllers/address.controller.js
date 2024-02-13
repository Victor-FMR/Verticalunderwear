import { createdAddress, deleteAddress, getAddress, putAddress } from "../services/address.service";
export const postAddressCtrl = async (req, res) => {
    try {
        const result = await createdAddress(req, res);
        res.json(result);
    }
    catch (error) { }
};
export const getAddressCtrl = async (req, res) => {
    try {
        const result = await getAddress(req, res);
        res.json(result);
    }
    catch (error) { }
};
export const putAddressCtrl = async (req, res) => {
    try {
        const result = await putAddress(req, res);
        res.json(result);
    }
    catch (error) { }
};
export const deleteAddressCtrl = async (req, res) => {
    try {
        const result = await deleteAddress(req, res);
        res.json(result);
    }
    catch (error) { }
};
