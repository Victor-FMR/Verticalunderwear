// import { Request, Response, Router } from "express";
// import upload from "../multer-config";
// import path from "path";
// import { uploadFile,readFile, getFiles } from "../aws/s3.aws.js";



// const server = Router()


// server.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../prueba.html'))
// })
// server.post('/upload', upload.single('archivo'),  async function(req, res){
//    const result =  await uploadFile(req)
//     console.log(req.file)
//     res.json({result})
// })



// server.get('/file/:filename',async(req:Request,res: Response)=>{
    
//     const result = await readFile(req.params.filename)
//     console.log(result.$metadata)
//    res.send('recivido')
  

   
// })


// server.get('/file',async(req,res)=>{
//     const result = await getFiles()
//     res.json({result})
    
//  })
// export default server