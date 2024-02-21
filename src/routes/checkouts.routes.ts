


import { Router } from "express";
import { checkAuthorization } from "../middlewares/request.middleware.js";
import { checkoutsInformationCtrl, checkoutsPaymentCtrl, checkoutsShippingCtrl } from "../controllers/checkouts.controller.js";


const server = Router()

server.post('/checkout', (_req, _res) => {
  // Actualizar el carrito en la sesión de compra
});


// Endpoint para actualizar el carrito
server.post('/checkout/cart', (_req, _res) => {
    // Actualizar el carrito en la sesión de compra
  });
  
  // Endpoint para guardar la información del usuario
  server.post('/checkout/information',checkAuthorization,checkoutsInformationCtrl
    // Guardar la información del usuario y permitir pasar al siguiente paso
  );
  
  // Endpoint para elegir el método de envío
  server.post('/checkout/shipping', checkAuthorization,checkoutsShippingCtrl
    // Guardar el método de envío y permitir pasar al siguiente paso
  );
  
  // Endpoint para el pago
  server.post('/checkout/payment',checkAuthorization, checkoutsPaymentCtrl
    // Procesar el pago y finalizar la compra
);

  server.post('/checkout/complete')


 export default server