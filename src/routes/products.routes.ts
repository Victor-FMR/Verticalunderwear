import { Router } from "express";
import { getProductsByNameCtrl, productsCtrl,createdProductsCtrl, putProductsCtrl } from "../controllers/products.controller.js";
import { checkAuthorization } from "../middlewares/request.middleware.js";


const server = Router()

server.get('/api/product/details-product/:id', )

server.get('/api/products', checkAuthorization,productsCtrl)

server.get('/api/products/:name',checkAuthorization,getProductsByNameCtrl)

server.post('/api/products',checkAuthorization,createdProductsCtrl)

server.put('/api/products/:id',checkAuthorization,putProductsCtrl)

server.delete('/api/products/:id',checkAuthorization)


export default server