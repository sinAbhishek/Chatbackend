import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../model/User.js"
import { createError } from "../utilities/error.js";
import dotenv from "dotenv"

dotenv.config()
export const Register=async (req,res)=>{
 try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
console.log(req.body)
const newuser=new User({
    ...req.body,password:hash,image:req.file.originalname
})
    const saveduser = await newuser.save()
    res.status(200).json(saveduser)
 }
 catch(err){    
    res.status(500).json(err)
 }
}
export const Login=async (req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"user not found"))
        const passwordcorrect= await bcrypt.compare(req.body.password,user.password)
        if(!passwordcorrect)
        return next(createError(400,"password is not correct"))
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SecretKey);
        const {password,isAdmin,...other}=user._doc
        res.cookie("access token",token,{
            httpOnly:true
        }).status(200).json({details:{...other,isAdmin}})
    }
    catch(err){
        next(err)
    }
}

export const getuser =async (req,res)=>{
    try{
        const user=await User.find({_id:req.params.userid})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const Alluser =async (req,res)=>{
    const search=req.query;
    console.log(search)
    if (search.name==0){
        try{const searchresult=await User.find();
            res.status(200).json(searchresult)
               }
               catch(err){
                   next(err);
               }
           }
        else{
    console.log(search)
    try{const searchresult=await User.find(search);
     res.status(200).json(searchresult)
    }
    catch(err){
        next(err);
    }
        }
}
export const addfriend=async(req,res)=>{
    try{
        const user=await User.updateOne({_id:req.params.userid},{$push:{friends:req.params.friendid}})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const addPending=async(req,res)=>{
    try{
        const user=await User.updateOne({_id:req.params.userid},{$push:{requestSent:req.params.friendid}})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const addFriendRequest=async(req,res)=>{
    console.log(req.params)
    try{
        const user=await User.updateOne({_id:req.params.userid},{$push:{friendrequest:req.params.friendid}})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const getSearch=async(req,res)=>{
    try{
        const user=await User.find({_id:req.params.userid},{$push:{friendrequest:req.params.friendid}})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const addnew=async(req,res)=>{
    const user= await User.updateMany({},{$set:{"friendrequest":[]}})
}
export const removeFriendRequest=async(req,res)=>{
    try{
        const user=await User.updateOne({_id:req.params.userid},{$pull:{friendrequest:req.params.friendid}})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const removePending=async(req,res)=>{
    try{
        const user=await User.updateOne({_id:req.params.userid},{$pull:{requestSent:req.params.friendid}})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const removefriend=async(req,res)=>{
    try{
        const user=await User.updateOne({_id:req.params.userid},{$pull:{friends:req.params.friendid}})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}