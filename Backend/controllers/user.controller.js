import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import bcrypt from 'bcrypt';

const generateAccessandRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        if(!user){
            console.log("generateAccessandRefreshToken :: User Not Found");
        }else{
            const accessToken = user.generateAccessToken();
            const refreshToken =  user.generaterefreshToken();
            user.refreshToken = refreshToken;
            await user.save({validateBeforeSave :false})
            return {accessToken,refreshToken}
        }
    } catch (error) {
        console.log("AccessToken and RefreshToken were not generated check user.controller" , error.message)
    }
}



const registerUser = async(req,res)=>{
    const {UserName , Email , Password} = req.body;
    const Image = req.file?.path
    try {
        if(!UserName || !Email || !Password){
            console.log("registerUser :: All Fields are required ")
        }
        const image_url = await uploadOnCloudinary(Image)
        const hashedpassword = await bcrypt.hash(Password,10)
        const user = new User({
            UserName : UserName,
            Email : Email ,
            Password : hashedpassword,
            Image : image_url.url,
        })
        await user.save()
        if(!user){
            console.log("registerUser :: User Not Created")
        }
        return res.status(201).json({message:"User Registered Successfully" , data:{user}})
    } catch (error) {
        return res.status(400).json({message :" Error in RegisterUser function", error})
    }
}



const loginUser = async(req,res)=>{
    const {UserName , Email ,Password} = req.body;
try {
       
        if(!UserName || !Email || !Password){
            return res.status(400).json({message:"All Fields are required"})
        }

        const user = await User.findOne(
            {Email}
        )
        if(!user){
            return res.status(404).json({message : 'No user Found'})
        }
        const decryptedpassword = await bcrypt.compare(Password, user.Password)
        if(decryptedpassword){
            const {accessToken,refreshToken} = await generateAccessandRefreshToken(user._id)
            // localStorage.setItem('accessToken' , accessToken)
            // localStorage.setItem('refreshToken' , refreshToken)
            user.refreshToken = refreshToken
            return res.status(201).json({message:"User Logged In Successfully" , data:{user}})
        }else{
            return res.status(400).json({message:"Login :: Invalid Password"})
        }
} catch (error) {
    return res.status(400).json({message : "LogIn Function Did not work in backend" , error})
} 
}

const logout = async(req,res)=>{
    const userId = req.user
    try {
        await User.findByIdAndUpdate(userId ,
            {
                $set:{refreshToken:undefined}
            },
            {
                new: true
            }
        )
        // localStorage.clear('accessToken')
        // localStorage.clear('refreshToken')
        return res.status(201).json({message:"user controller :: User Logged Out Successfully"})
    } catch (error) {
        return res.status(400).json({message:"user Controller :: User Did Not logout"})
    }
}





export {
    loginUser,
    registerUser,
    logout ,
}