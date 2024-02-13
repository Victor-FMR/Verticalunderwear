import { Router } from "express";
const server = Router();
server.post('/api/orderItems');
server.get('/api/orderItems');
server.get('/api/orderItems/:id');
server.put('/api/orderItems/:id');
server.delete('/api/orderItems/:id');
export default server;
//# sourceMappingURL=orderItems.routes.js.map