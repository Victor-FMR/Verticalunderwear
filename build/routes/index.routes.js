import { Router } from "express";
import { accessoriesCtrl, brandCtrl, homeCtrl, newCtrl, rewardsCtrl, saleCtrl, womenCtrl, youthCtrl } from "../controllers/index.controller";
//import { oAuth2 } from "../utils/oauth2.handles";
const server = Router();
server.get('/', homeCtrl);
server.get('/collections/women-shop-all', womenCtrl);
server.get('/collections/sale-shop-all', saleCtrl);
server.get('/collections/news-shop-all', newCtrl);
server.get('/collections/brands-shop-all', brandCtrl);
server.get('/collections/accessories-shop-all', accessoriesCtrl);
server.get('/collections/rewards-shop-all', rewardsCtrl);
server.get('/collections/youth-shop-all', youthCtrl);
export default server;
//# sourceMappingURL=index.routes.js.map