import { Router } from "express";
import { addCartCtrl, putCartCtrl, deleteCartCtrl, dismiCartCtrl } from "../controllers/shoppingCart.controller";
import { checkAuthorization } from "../middlewares/request.middleware";
const server = Router();
server.post("/agregar-al-carrito/:id", checkAuthorization, addCartCtrl);
server.get("/ver-carrito", checkAuthorization);
server.put("/actualizar-carrito/:id", checkAuthorization, putCartCtrl);
server.delete('/eliminar-del-carrito/:id', checkAuthorization, deleteCartCtrl);
server.delete("/disminuir-carrito/:id", checkAuthorization, dismiCartCtrl);
export default server;
//# sourceMappingURL=shoppingCart.routes.js.map