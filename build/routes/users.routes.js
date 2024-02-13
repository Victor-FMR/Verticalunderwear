import { Router } from "express";
const server = Router();
server.get('/api/users');
server.get('/api/user/:id');
server.post('/api/user/:id');
server.put('/api/user/:id');
server.delete('/api/user/:id');
export default server;
//# sourceMappingURL=users.routes.js.map