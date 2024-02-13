import { Router } from "express";
import { loginCtrl, logoutCtrl, refreshCtrl, registerCtrl } from "../controllers/auth.controller.js";
import { limiter } from "../middlewares/rateLimit.middleware.js";
import { registerValidator } from "../middlewares/auth.schema.middleware.js";
import { checkAuthorization } from "../middlewares/request.middleware.js";



const server = Router()


server.post('/auth/register', registerValidator,registerCtrl)

server.post('/auth/login',limiter, loginCtrl)


server.post("/refresh-token",checkAuthorization,refreshCtrl)

server.post('/logout',checkAuthorization,logoutCtrl)



export default server