import multer from "multer";
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
//# sourceMappingURL=multer-config.js.map