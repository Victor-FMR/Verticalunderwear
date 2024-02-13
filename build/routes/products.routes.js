import { Router } from "express";
import { getProductsByNameCtrl, productsCtrl, createdProductsCtrl, putProductsCtrl } from "../controllers/products.controller";
import { checkAuthorization } from "../middlewares/request.middleware";
const server = Router();
server.get('/api/products', checkAuthorization, productsCtrl);
server.get('/api/products/:name', checkAuthorization, getProductsByNameCtrl);
server.post('/api/products', checkAuthorization, createdProductsCtrl);
server.put('/api/products/:id', checkAuthorization, putProductsCtrl);
server.delete('/api/products/:id', checkAuthorization);
export default server;
//# sourceMappingURL=products.routes.js.map