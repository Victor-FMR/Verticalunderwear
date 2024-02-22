import axios from "axios";
import countries from "i18n-iso-countries";
import { PAYPAL_API, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, } from "../config.js";
import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();
export const getPaypalToken = async () => {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        const { data: { access_token }, } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_CLIENT_SECRET,
            },
        });
        //aqui esat el error
        return access_token; //res.status(200).json(access_token);
    }
    catch (error) {
        console.error("Error al obtener el token de acceso:", error);
        throw new Error("Error Al obetener token de Paypal");
    }
};
export const createpaypalOrder = async (req) => {
    const userId = req.user.id;
    try {
        // Obtener el token de acceso de PayPal
        const access_token = await getPaypalToken();
        // Recuperar la sesión de checkout para obtener el total a pagar
        const checkoutSession = await Prisma.checkoutSession.findUnique({
            where: { userId: userId },
        });
        if (!checkoutSession) {
            throw new Error("Sesión de checkout no encontrada.");
        }
        const shop = await Prisma.shoppingCart.findUnique({
            where: { userId: userId },
        });
        if (!shop) {
            throw new Error("Carrito de compras no encontrado.");
        }
        const cartItems = await Prisma.cartItem.findMany({
            where: { shoppingCart: { userId: userId } },
            include: { product: true },
        });
        // Preparar los artículos para PayPal
        const items = cartItems.map((item) => ({
            name: item.product.productName,
            unit_amount: {
                currency_code: "USD",
                value: item.priceAtAdd.toString(),
            },
            quantity: item.quantity.toString(),
        }));
        const countryName = checkoutSession.information
            .country;
        //const countryCodeEN = countries.getAlpha2Code('United States', 'en'); // Inglés
        const countryCodeES = countries.getAlpha2Code(countryName, "es"); // Español
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: PAYPAL_API,
                    amount: {
                        currency_code: "USD",
                        value: "10",
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: "10", //shop.totalPrice, // Total de los artículos como cadena
                            },
                            shipping: {
                                // Costo de envío
                                currency_code: "USD",
                                value: "10", //checkoutSession.shippingCost
                            },
                        }, // Show the breakdown of tax and shipping charges
                    },
                    items: items,
                    shipping: {
                        name: {
                            full_name: `${checkoutSession.information.first_name} ${checkoutSession.information.last_name}` || "",
                        },
                        address: {
                            address_line_1: checkoutSession.information
                                .address_line_1 || "",
                            address_line_2: checkoutSession.information
                                .address_line_2 || "",
                            admin_area_1: checkoutSession.information.state,
                            admin_area_2: checkoutSession.information.city || "",
                            postal_code: checkoutSession.information.zipcode || "",
                            country_code: countryCodeES || "", // El código de país ISO de 2 letras
                        },
                    },
                },
            ],
            payment_source: {
                paypal: {
                    experience_context: {
                        payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                        brand_name: "Verticalunderwear",
                        locale: "en-US",
                        landing_page: "LOGIN",
                        shipping_preference: "SET_PROVIDED_ADDRESS",
                        user_action: "PAY_NOW",
                        return_url: "http://localhost:8003/v2/checkout/orders/capture",
                        cancel_url: "https://example.com/cancelUrl",
                    },
                },
            },
        };
        const { data } = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                //"Content-Type": "application/json",
            },
        });
        // const detailsOrder= {
        //   id: data.id,
        //   status: data.status,
        // }
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
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
export const capturePaymentOrder = async (req, res) => {
    try {
        //const userId= (req.user as User)
        const { token } = req.query;
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_CLIENT_SECRET,
            },
        });
        console.log(response.data);
        return res.status(200).json({ message: "order Capturada" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Error capturing PayPal payment");
    }
};
