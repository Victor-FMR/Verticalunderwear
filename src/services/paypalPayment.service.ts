import { Request, Response } from "express";
import axios from "axios";
import { PAYPAL_API, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from "../config.js";
import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/user.interface.js";
export const getPaypalToken = async ( res: Response) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");


    const {data:{access_token}} = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,params,{
        auth : {
          username: PAYPAL_CLIENT_ID ,
          password: PAYPAL_CLIENT_SECRET 
        }

      }
    
    );
    //aqui esat el error
    return access_token//res.status(200).json(access_token);
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error);
    res.status(500).json({ message: "Error al obtener el token de acceso" });
  }
};
const Prisma = new PrismaClient();



export const createpaypalOrder = async(req: Request,res: Response) => {
  const userId = (req.user as User)
  try {
    //const selectAddress =await  Prisma.address.findFirst({where: {userId:userId.id }})

   const shop =await  Prisma.shoppingCart.findUnique({where: {userId:userId.id }})


  
    // Obtener el token de acceso de PayPal
    const access_token = await getPaypalToken(res);
    
    

    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: PAYPAL_CLIENT_ID, // The reference ID for the transaction in your system.
          amount: {
            currency_code: "USD",
            value: shop!.totalPrice  // The amount of the transaction in the currency specified above.
          },
          // shipping:{
          //   address:{
          //     address_line_1: selectAddress.street,
          //     admin_area_1: selectAddress.city,
          //     postal_code: selectAddress.zipcode,
          //     country_code: selectAddress.country      

          //   }
          // }
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            brand_name: "Verticalunderwear",
            "locale": "en-US",
            landing_page: "LOGIN",
            //"shipping_preference": address,
            user_action: "PAY_NOW",
            "return_url": "http://localhost:8003/v2/checkout/orders/capture",
            //"cancel_url": "https://example.com/cancelUrl"
          },
        },
      },
    };
  
  
    const {data} = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        //"Content-Type": "application/json",
      },
    });

  
    return res.status(202).json({ message: "Order created successfully",data});
  } catch (error) {
    console.log(error)
    return res.status(503).send("Error creating PayPal order");
  }
  

};


// export const detailsPaypalOrder = async(req: Request,res: Response) => {
//   try {

//     const { token } = req.query
    
//      const {data}  =await axios.get(`${PAYPAL_API}/v2/checkout/orders/details/${token}`, {
       
//        auth: {
//          username: PAYPAL_CLIENT_ID,
//          password: PAYPAL_CLIENT_SECRET,
//        }
//      })
    
//      return res.status(200).json({message:"Detalles de pedido"})
//   } catch (error) {
//     console.log(error)
//     res.status(503).send("Error getting PayPal order details");
//   }
 
// }


export const capturePaymentOrder = async (req: Request,res: Response) => {
  try {
   //const userId= (req.user as User)
    const {token}= req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,{},{
     auth: {
       username: PAYPAL_CLIENT_ID,
       password: PAYPAL_CLIENT_SECRET,
     }
    } )
    console.log(response.data)
    return res.status(200).json({message: "order Capturada"})
  } catch (error) {
    console.log(error)
    return res.status(500).send("Error capturing PayPal payment")
  }

 
}