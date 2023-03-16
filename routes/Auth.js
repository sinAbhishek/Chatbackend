import express from "express"
import {addfriend, Login,Register,getuser,Alluser,addFriendRequest,addPending,addnew,removeFriendRequest,removePending,removefriend} from "../controller/Auth.js"

import multer from "multer"


const router=express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, 'public/images/')
    },
    filename: (req, file, cb)=>{
      cb(null, file.originalname )
    }
  })
  const upload = multer({ storage: storage })


router.post("/login",Login)
router.post("/register",upload.single("image"),Register)
router.put("/:userid/:friendid",addfriend)
router.put("/remove/:userid/:friendid",removefriend)
router.get("/:userid",getuser)
router.get("/",Alluser)
router.put("/pending/:userid/:friendid",addPending)
router.put("/request/:userid/:friendid",addFriendRequest)
router.put("/removepending/:userid/:friendid",removePending)
router.put("/removerequest/:userid/:friendid",removeFriendRequest)
router.put("/",addnew)
// router.get("/pending",addPending)
// router.get("/request",getFriendRequest)


export default router