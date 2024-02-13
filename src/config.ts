import "dotenv/config";

export const AWS_ID_PUBLIC_KEY = process.env.AWS_ID_PUBLIC_KEY as string;
export const AWS_ID_SECRET_KEY = process.env.AWS_ID_SECRET_KEY as string;
export const AWS_NAME_BUCKET = process.env.AWS_NAME_BUCKET as string;
export const AWS_PUBLIC_REGION = process.env.AWS_BUCKET_REGION;

//PAYPAL
export const PAYPAL_API = process.env.PAYPAL_API  as string
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID  as string
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET as string

export const SECRET_TOKEN = process.env.SECRET_TOKEN as string;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;

export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const PORT = process.env.PORT;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL as string;

