import { Router } from "express";
import {  capturePaymentOrderCtrl, postPaypalOrderCtrl, postPaypalTokenCtrl } from "../controllers/paypal.Payment.controller.js";
import { checkAuthorization } from "../middlewares/request.middleware.js";

const server = Router();

server.post('/v1/oauth2/token', checkAuthorization,postPaypalTokenCtrl)

server.get(`/v2/checkout/orders`,checkAuthorization,postPaypalOrderCtrl)

//server.get('/v2/checkout/orders/details',detailsPaypalOrderCtrl)

server.get(`/v2/checkout/orders/capture`,checkAuthorization,capturePaymentOrderCtrl)


server.get(`/v2/checkout/orders/{id}/confirm-payment-source`)
//server.post(`/v2/checkout/orders/capture`,capturePaymentOrderCtrl)
// server.get('/')
// server.get('/')
// server.get('/')


export default server;