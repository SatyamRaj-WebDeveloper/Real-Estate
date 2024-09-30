import jwt from 'jsonwebtoken';
import {admin} from '../models/adminuser.model.js'
import {User} from '../models/user.model.js'


export const verifyjwt = async(req , res, next)=>{
    try {
        const token = req.header('Authorization')?.replace("Bearer" , "").trim()
        if(!token){
           return res.status(404).json({message : "No token Found"})
        }
        const decodedtoken = jwt.verify(token , process.env.ACCESS_TOKEN);
        
        const user = await admin.findById(decodedtoken?._id).select('-Password')
        if(!user){
            return res.status(401).json({message:"Token Not Verified"})
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({message:"Error in Verify Jwt Function"})
    }
}
export const verifyjwtuser = async(req , res, next)=>{
    try {
        const token = req.header('Authorization')?.replace("Bearer" , "").trim()
        if(!token){
           return res.status(404).json({message : "No token Found"})
        }
        const decodedtoken = jwt.verify(token , process.env.ACCESS_TOKEN);
        
        const user = await User.findById(decodedtoken?._id).select('-Password')
       
        if(!user){
            return res.status(401).json({message:"Token Not Verified"})
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({message:"Error in Verify Jwt Function"})
    }
}


