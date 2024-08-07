import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"

export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body

        //validations
        if(!name){
            return res.send({message:'Name is required'});
        }
        if(!email){
            return res.send({message:'Email is required'});
        }
        if(!password){
            return res.send({message:'Password is required'});
        }
        if(!phone){
            return res.send({message:'Phone is required'});
        }
        if(!address){
            return res.send({message:'Address is required'});
        }

        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registered, Please Login'
            })
        }

        //register User
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:'User Registered',
            user
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
 }


 //POST LOGIN 

 export const loginController = async (req,res)=>{
    try{
        const {email,password}=req.body
        
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.status(200).send({
            success:true,
            message:'login successful',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
 }


 //test Controller
 export const testController = (req,res)=>{
    res.send("protected Route")
 }