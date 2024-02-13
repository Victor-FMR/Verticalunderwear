import { Router } from "express";


const server = Router()

server.post('/api/orders')

server.get('/api/orders')

server.put('/api/orders/status')

server.put('/api/orders/:id/status')

server.get('/api/orders/user/:id')

server.post('/api/orders/user/:id')

server.put('/api/orders/user/:id')

server.delete('/api/orders/user/:id')


export default server
