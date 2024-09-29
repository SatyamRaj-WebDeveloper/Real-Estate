import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'



export const verifyjwt = async(req , res, next)=>{
    try {
        const token = req.header('Authorization').replace("Bearer" , " ")
        if(!token){
           return res.status(404).json({message : "No token Found"})
        }
        console.log(token)
        const decodedtoken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedtoken?._id).select('-Password')
        console.log(user)
        console.log(decodedtoken)
        if(!user){
            return res.status(401).json({message:"Token Not Verified"})
        }
        console.log(decodedtoken)
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({message:"Error in Verify Jwt Function"})
    }


}


