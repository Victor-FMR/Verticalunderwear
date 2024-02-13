import { NextFunction, Request, Response } from "express"

export const oAuth2 = (req: Request, res: Response, next: NextFunction)=>{
    if(req.user)
    {next()
    }else{
        res.redirect('/Home')}
}


export const isNotAuth2 = (req: Request, res: Response, next: NextFunction)=>{
  if(req.user)
    {res.redirect('/api/address')}else{
        next()
    }

}