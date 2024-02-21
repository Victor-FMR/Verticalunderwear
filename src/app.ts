import Express from "express";

import cookieParser from "cookie-parser";

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import  countries from 'i18n-iso-countries';

// Registrar idiomas que necesitas
import englishLocales from 'i18n-iso-countries/langs/en.json' assert {type: 'json'} //English 
import spanishLocales from 'i18n-iso-countries/langs/es.json' assert {type: 'json'}//Español 


countries.registerLocale(englishLocales);
countries.registerLocale(spanishLocales);



// (async () => {
//     const englishLocales = await import('i18n-iso-countries/langs/en.json');
//     const spanishLocales = await import('i18n-iso-countries/langs/es.json');
    
//     countries.registerLocale(englishLocales.default);
//     countries.registerLocale(spanishLocales.default);
//   })();

//routes
import checkoutsRoutes from './routes/checkouts.routes.js'
import PaypalRoutes from './routes/paypalPayment.routes.js'
import indexRoutes from "./routes/index.routes.js";
import paymentMethodsRoutes from './routes/paymentMethods.routes.js'
import shoppingRoutes from "./routes/shoppingCart.routes.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import addressRoutes from "./routes/address.routes.js";

//import uploadRoutes from './routes/upload.routes'

//import oauth2Routes from "./routes/oauth2.routes";

const app = Express();
app.use(cookieParser());

//req.user global

// app.use((req: Request ,res: Response, next: NextFunction)=>{
//     app.locals.user = req.user
//     next()
//     })
    

app.use(helmet());
app.use(cors({origin: 'http://localhost:8003'}));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

//middleware
app.use(morgan("dev"));

//routes
app.use(shoppingRoutes)
app.use(indexRoutes);
app.use(productsRoutes);
//app.use(oauth2Routes);
app.use(authRoutes);
app.use(paymentMethodsRoutes);
app.use(addressRoutes);
app.use(checkoutsRoutes)
app.use(PaypalRoutes)
//app.use(uploadRoutes)
export default app;
