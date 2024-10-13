import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import bcrypt from 'bcrypt';
import {post} from '../models/post.model.js'
import {admin} from '../models/adminuser.model.js'
import { sendMail } from '../middlewares/emailOTP.js';
import { request } from '../models/request.model.js';
import { generatehtmltemplate } from '../utils/template.js';

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
    console.log(UserName , Email , Password,Image)
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

const getCurrentUser = async(req,res)=>{
    const userId = req.user;
    if(!userId){
        return res.status(404).json({message:'Invalid User Id'})
    }
    try {
         const user = await User.findById({_id:userId})
         if(!user){
           return res.status(404).json({message:"No user Found"})
         }
         return res.status(200).json({message:"User Fetched Successfully" , data:user})
    } catch (error) {
        return res.status(400).json({message:'User Controller :: get Current User function did not work'})
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
            console.log("Users accessToken",accessToken)
            return res.status(201).json({message:"User Logged In Successfully" , data:{user}})
        }else{
            return res.status(400).json({message:"Login :: Invalid Password"})
        }
} catch (error) {
    console.log(error.message)
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


const Book = async(req,res)=>{
    const plotId = req.params.plotId
    const userId = req.user;
    // console.log("PLot id",plotId)
    try {
      if(!plotId){
        console.log("User Controller :: Invalid Plot Id")
      }
      const Plot = await post.findByIdAndUpdate(
        {
            _id:plotId
        },
        {
            $set:{isBooked:true}
        },
        {
            new : true
        }
      );
      const Admin = await admin.findOne(
        {
            UserName : Plot.owner
        }
      )
      const adminEmail = Admin.Email;
      const Text = "SomeOne Just booked your Plot"
      sendMail(adminEmail , Text)
      if(!Plot){
        console.log("User Controller :: No Plot Found")
      }
      const user = await User.findById(userId)
      user.Bookings = Plot+
      await user.save()
      return res.status(201).json({message:"Booking :: Plot Booked Successfully",data:{user}})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"User Controller :: Booking Function not worked",error})
    }
}


const AddtoWishlist = async(req,res)=>{
    const postId = req.params.postId;
    const userId = req.user;
    try {
        if(!postId){
            console.log("Invalid Post Id")
        }
        const Post = await post.findById(postId)
        if(!Post){
            console.log("No Post found")
        } 
        const user = await User.findById(userId );
        if(!user){
            console.log("No User Found")
        }else{
            user.WishList.push(Post)
        }
        await user.save();
        return res.status(201).json({message:"Added To Wishlist Successfully" , data:{user}})
    } catch (error) {
        return res.status(400).json({message:"Could Not Add To wishlist" ,error})
    }
}

const deleteItemfromWishlist = async(req,res)=>{
    const postId = req.params.postId;
    const userId = req.user;
    try {
        const user = await User.findById(userId);
        if(!user){
            console.log("No User Found")
        }else{
            console.log("user :: ",user)
          user.WishList =  user.WishList.filter((id)=>id.toString()!==postId.toString())
            console.log("user wishlist :: ",user.WishList)
        }
        await user.save()
        return res.status(201).json({message:"Post Deleted from wishlist Successfully" , data:{user}})
    } catch (error) {
        return res.status(400).json({message:"User Controller :: Could not delete from wishlist"})
    }

}

const usersWishlist = async(req,res)=>{
    const userId=req.user._id;
    console.log(userId)
   try {
     if(!userId){
     return res.status(400).json({message:"Invalid User Details"})
     }
     const user = await User.findById(userId)
     if(!user){
         console.log("No User Found")
     }
     const list = user.WishList
     if(!list){
         return res.status(404).json({message:"NO List Found"})
     }else if(list.length<=0){
         return res.status(400).json({message:"No Items In Wishlist"})
     }
     const posts = await post.find({
        _id:{$in:list}
     })
     if(posts.length === 0){
        return res.status(400).json({message:"NO Post Found in the Wishlist"})
     }else{
        return res.status(201).json({message:"Wishlist Fetched Successfully",posts})
     }
    
   } catch (error) {
      return res.status(400).json({message:"fetch List function did not work" , error})
   }
}

const ContactOwner=async(req,res)=>{
    const userId = req.user._id;
    const propertyId = req.params.propertyId;
    const {message , email ,Phone} = req.body;
    try {
       if(!userId || !propertyId){
        res.status(404).json({message:"Invalid user Id or Propert Id"})
       }
       const Request = new request({
        userId,
        propertyId,
        messagefromUser : message,
        usersEmail : email,
        usersPhone : Phone,
       })
       await Request.save();
       const user = await User.findById(userId)
       const property = await post.findById(propertyId);
       const Admin = property.owner
       const admindata = await admin.findOne(
        {UserName : Admin})
        console.log(admindata)
       const adminEmail = admindata.Email 
       console.log(adminEmail)
       const html = generatehtmltemplate(Request._id , user.UserName)
       sendMail(adminEmail , html)
       if(!Request){
        return res.status(400).json({message:"Request Function :: Could Not send request"})
       }else{
        return res.status(201).json({message:"Request Function :: Request Send Successfully" ,data:{Request}})
       }
    } catch (error) {
       res.status(400).json({message:"Contact Function :: did not work"}) 
    }
}

export {
    Book,
    loginUser,
    registerUser,
    logout ,
    AddtoWishlist,
    deleteItemfromWishlist,
    usersWishlist,
    ContactOwner,
    getCurrentUser,
}