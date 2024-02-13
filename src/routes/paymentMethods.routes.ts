import { Router } from "express";
import { checkAuthorization } from "../middlewares/request.middleware.js";
import { deleteUserPaymentMethodsCtrl, getUserPaymentMethodsCtrl, postUserPaymentMethodsCtrl, putUserPaymentMethodsCtrl } from "../controllers/paymentMethods.controller.js";


const server = Router()

server.post('/api/payment-methods', checkAuthorization, postUserPaymentMethodsCtrl)

server.get('/api/payment-methods', checkAuthorization, getUserPaymentMethodsCtrl)

server.put('/api/payment-methods/:id',checkAuthorization,putUserPaymentMethodsCtrl)

server.delete('/api/payment-methods/:id',checkAuthorization,deleteUserPaymentMethodsCtrl)



export default server