import multer from "multer";
//import path from "path";
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, path.join(__dirname, '/uploads') )
//     },
//     filename: (req,file,cb)=>{
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })
const upload = multer({ storage: multer.memoryStorage() });
export default upload;
