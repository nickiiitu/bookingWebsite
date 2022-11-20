import express from "express";
import { login, register } from "../controllers/auth.js";
import multer from "multer";
const router = express.Router();
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./routes/images')//folder name where failes have to be stored
    },
    filename:(req,file,cb)=>{
      cb(null,req.body.name);
    }
  })
  const upload = multer({
    storage
  });
  router.post("/upload",upload.single("img"),async (req,res)=>{
    try {
    res.status(200).json("updated");
        
    } catch (error) {
        console.log(error);
    }
})
router.post("/register", register)
router.post("/login", login)

export default router