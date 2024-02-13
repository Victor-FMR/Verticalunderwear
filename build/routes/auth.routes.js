import { Router } from "express";
import { loginCtrl, logoutCtrl, refreshCtrl, registerCtrl } from "../controllers/auth.controller";
import { limiter } from "../middlewares/rateLimit.middleware";
import { registerValidator } from "../middlewares/auth.schema.middleware";
import { checkAuthorization } from "../middlewares/request.middleware";
const server = Router();
server.post('/auth/register', registerValidator, registerCtrl);
server.post('/auth/login', limiter, loginCtrl);
server.post("/refresh-token", checkAuthorization, refreshCtrl);
server.post('/logout', checkAuthorization, logoutCtrl);
export default server;
//# sourceMappingURL=auth.routes.js.map