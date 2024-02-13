import { Router } from "express";
import { addCartCtrl,  putCartCtrl, dismiCartCtrl } from "../controllers/shoppingCart.controller.js";
import { checkAuthorization } from "../middlewares/request.middleware.js";


const server = Router();

server.post("/agregar-al-carrito/:id",checkAuthorization,addCartCtrl);

server.get("/ver-carrito", checkAuthorization);

server.put("/actualizar-carrito/:id",checkAuthorization,putCartCtrl);

server.delete('/eliminar-del-carrito/:id',checkAuthorization,)

server.delete("/disminuir-carrito/:id",checkAuthorization,dismiCartCtrl);

export default server
