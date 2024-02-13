import { Router } from "express";
import { deleteAddressCtrl, getAddressCtrl, postAddressCtrl, putAddressCtrl } from "../controllers/address.controller";
import { checkAuthorization } from "../middlewares/request.middleware";
//import { oAuth2 } from "../utils/oauth2.handles";
const server = Router();
server.get('/api/address', checkAuthorization, getAddressCtrl);
server.post('/api/address', checkAuthorization, postAddressCtrl);
server.get('/api/address/:id');
server.put('/api/address/:id', checkAuthorization, putAddressCtrl);
server.delete('/api/address/:id', checkAuthorization, deleteAddressCtrl);
export default server;
//# sourceMappingURL=address.routes.js.map