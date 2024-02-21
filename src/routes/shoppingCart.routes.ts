import { Router } from "express";
import { addCartCtrl, checkShoppingCartCtrl, dismiCartCtrl,} from "../controllers/shoppingCart.controller.js";
import { checkAuthorization } from "../middlewares/request.middleware.js";


const server = Router();

server.get("/ver-carrito", checkAuthorization,checkShoppingCartCtrl);

server.post("/cart-addProduct",checkAuthorization,addCartCtrl);

server.put("/disminuir-carrito",checkAuthorization,dismiCartCtrl);


server.put("/actualizar-carrito/:id",checkAuthorization,);

server.delete('/eliminar-del-carrito/:id',checkAuthorization,)


export default server
