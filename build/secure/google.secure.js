"use strict";
// import { Strategy, VerifyCallback} from "passport-google-oauth20.js";
// import passport from "passport";
// import {
//   GOOGLE_CALLBACK_URL,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
// } from "../config";
// import { PrismaClient } from "@prisma/client";
// const Prisma = new PrismaClient();
// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id:any, done) => {
//   try {
//     const google = await Prisma.googleAuth.findUnique({
//       where: { id: id },
//     });
//     if(google){return done(null, google)}
//   } catch (error) {
//     console.log(error);
//     done(error, null);
//   }
// });
// passport.use(
//   new Strategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//       //prompt : 'select_account',
//       scope: ["profile", "email"],
//     },
//     async (acessToken, refreshToken, profile, done: VerifyCallback) => {
//       try {
//         const found = await Prisma.googleAuth.findUnique({where: {googleId: profile.id}})
//          if (found){
//           console.log({message: 'Inicio sesion',})
//          return done(null,found)
//       }
//       const date = await Prisma.googleAuth.create({
//         data: {
//           googleId: profile.id,
//           googleUsername: profile.displayName,
//           googleEmail: profile.emails && profile.emails.length > 0? profile.emails[0].value: "",
//         },
//       });
//       console.log(date);
//       done(null, date);
//       } catch (error) {
//         console.log(error)
//         done(error as Error, null as any);
//       }
//     }
//   )
// );
