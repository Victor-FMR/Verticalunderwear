import { Router } from "express";
const server = Router();
server.post('/api/rating');
server.get('/api/rating');
server.get('/api/rating/:id');
server.put('/api/rating/:id');
server.delete('/api/rating/:id');
export default server;
