
<<<<<<< HEAD

=======
import { error } from "console";
>>>>>>> 300602aec16cc16a19f4aab068bc647609730ab2
import { Response } from "express";

export const handlesHttp = (res : Response, error: string)=>{
    res.status(500).json({message: error})

}