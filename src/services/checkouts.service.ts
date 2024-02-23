import { Request, Response } from "express"; 
import {parsePhoneNumberFromString} from 'libphonenumber-js'
import countries from 'i18n-iso-countries';
import { PrismaClient} from "@prisma/client";
import { User } from "../interfaces/user.interface.js";
import { createpaypalOrder } from "./paypalPayment.service.js";

const Prisma = new PrismaClient();



export const checkoutsInformation = async(req: Request, res: Response)=>{
    const userId = (req.user as User).id
    const { first_name, last_name, address_line_1, address_line_2, state,city, zipcode, country, phone,street } = req.body;
     
   
   
    //const countryCodeEN = countries.getAlpha2Code('United States', 'en'); // Inglés
    const countryCodeES = countries.getAlpha2Code(country, 'es'); // Español
   
     if(!countryCodeES){
        res.status(404).json({Message: `El país proporcionado (${country}) no es válido o no se pudo encontrar su código ISO.`});
    } 
     
    const phoneNumber = parsePhoneNumberFromString(phone, countryCodeES as any );
        // if (phoneNumber) {
        //   // El número es válido
        //    console.log(phoneNumber.formatInternational());
        // //return true;
        // }
    
  // Construye el objeto shippingAddress con la información proporcionada
  const shippingAddress = {
    first_name: first_name,
    last_name: last_name,
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    city: city,
    state: state,
    street: street,
    zipcode: zipcode,
    country: country,
    phone: phoneNumber?.formatInternational()
};

     

    try {
    let checkoutSession= await Prisma.checkoutSession.findUnique({where: {userId: userId}})
    const shoppingCart =await  Prisma.shoppingCart.findUnique({where:{userId: userId}})


    if (!shoppingCart) {
        return res.status(404).json({ message: 'Carrito no encontrado. Asegúrate de que el usuario esté registrado correctamente y tenga un carrito.' });
    }
    //const shippingAddress = await Prisma.address.findMany({where:{userId:userId}})
        
    const cart= await Prisma.cartItem.findMany({where:{shoppingCart:{userId: userId}}})
        
   
        
       
        // Si no existe una sesión de checkout, crea una nueva
        if (!checkoutSession) {
             checkoutSession = await Prisma.checkoutSession.create({
                data: {
                userId:userId,
                cart: (cart), // Inicializa con un carrito vacío o con los datos actuales del carrito
                information: shippingAddress, // Inicializa vacío
                shippingMethod: '', // Deja vacío inicialmente
                paymentDetails: {}, // Inicializa vacío
                shippingCost: 0,
                totalAmount: shoppingCart.totalPrice,
                currentStep: 'information', // El proceso comienza en el paso 'Cart'

                


                    // Puedes establecer valores predeterminados para otros campos necesarios aquí
                }
            });
        } else {
            // Si existe, actualiza la sesión de checkout con la nueva dirección de envío
            checkoutSession = await Prisma.checkoutSession.update({
                where: { userId: userId },
                data: {
                    cart: (cart),
                    totalAmount: shoppingCart.totalPrice,
                    shippingMethod: "",
                    shippingCost: 0,
                    paymentDetails: {},
                    information: (shippingAddress), // Actualiza con la nueva dirección de envío
                    currentStep: "information"
                }  
            });
        }

         
        //const actualizado = await Prisma.checkoutSession.findMany({where: {userId: userId},select:{shippingCost:true}})
      
        return res.status(200).json({ message: "Sesión de checkout verificada o iniciada.",checkoutSession});
    

    } catch (error) {
        console.error('Error al obtener o crear la sesión de checkout:', error)
        return res.status(500).json({ message: 'Error al obtener o crear la sesión de checkout' });
    }
}



export const checkoutsShipping = async(req: Request, res: Response)=>{
 
    const userId = (req.user as User).id;
    //const {shippingCost } = req.body
    //const { shippingData } = req.body; // Asume que los datos de envío se envían en el cuerpo de la solicitud
  
    try {
        // Actualizar la sesión de checkout existente con la nueva información de envío
        const check = await Prisma.checkoutSession.findFirst({where: {userId: userId}})
        const cart= await Prisma.cartItem.findMany({where:{shoppingCart:{userId: userId}}})

        if (!check) {
            // Manejar el caso en que no se encuentra la sesión de checkout
            return res.status(404).json({ message: "Sesión de checkout no encontrada." });
        }
          
        const shoppingCart =await  Prisma.shoppingCart.findUnique({where:{userId: userId}})


        if (!shoppingCart) {
            return res.status(404).json({ message: 'Carrito no encontrado. Asegúrate de que el usuario esté registrado correctamente y tenga un carrito.' });
        }
        
        // Establecer una tarifa plana de envío de 20 dólares
        const shippingCost = 20.00; // Tarifa de envío fija

        const updatedCheckoutSession = await Prisma.checkoutSession.update({
            where: {userId: userId},
            data: {
                cart: cart,
                shippingMethod: 'Standard',
                shippingCost: shippingCost,
                paymentDetails: {},
                totalAmount: shoppingCart.totalPrice.plus(shippingCost), // Agrega el costo de envío al total de la compra
                //information: JSON.stringify(shippingData), // Guarda la información de envío proporcionada
                currentStep: 'shipping', // Actualiza el paso actual a 'shipping'
            }
        });

        return res.status(200).json({ message: "Información de envío actualizada.", checkoutSession: updatedCheckoutSession });
    } catch (error) {
        console.error("Error en '/checkout/shipping':", error);
        return res.status(500).json({ message: "Error al actualizar la información de envío." });
    }
    
}



export const checkoutsPayment = async(userId:string,paymentMethod: string)=>{
    // const userId= (req.user as User).id
    // const {paymentMethod}=req.body
    try {
        const checkoutsSession = await Prisma.checkoutSession.findUnique({where: {userId: userId}})

          if(!checkoutsSession){
            throw new Error( "Sesión de checkout no encontrada.");
          }


          if(paymentMethod==='Paypal'){
            const paypal = await createpaypalOrder(userId)
            
           
            if(paypal){

              await  Prisma.checkoutSession.update({where: {userId: userId},
                    data: {paymentDetails:paypal , currentStep: 'Payment'}})
              const {id, status, payment,links}= paypal
              
              
              return {id,status,payment,links}//paypal["links"][0]["href"],
             
            }
         

         }else {
            // Si tienes otros métodos de pago, manejarlos aquí
            // ...
            // Asegúrate de retornar una respuesta para cada método de pago
            throw new Error("Método de pago no soportado");
            
        }
          
        return null
        
    } catch (error) {
        console.error(error)
       throw  error 
        
    }
}