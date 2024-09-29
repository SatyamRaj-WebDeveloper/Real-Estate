import {admin} from '../models/adminuser.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { sendMail } from '../middlewares/emailOTP.js';
import { post } from '../models/post.model.js';
import bcrypt from 'bcrypt';

const generateAccessandRefreshToken = async(userId)=>{
     try {
       const user = await admin.findOne(userId)
       if(!user){
        console.log("generateAccessandRefreshToken :: admin user not found")
       }
       const accessToken = user.generateAccessToken()
       const refreshToken = user.generaterefreshToken()
       user.refreshToken = refreshToken;
       await user.save({validateBeforeSave:false})
       return {accessToken , refreshToken}
     } catch (error) {
        console.log("AdminLogin :: Tokens not generated")
     }
}



const regitserAsAdmin = async(req,res)=>{
    const {UserName , Email , Password}=req.body;
    const avatar = req.file?.path;
    try {
        // console.log(UserName , Email , Password)
        if(!UserName || !Email || !Password){
          console.log("Admin Reguster :: All Fields are required")
        }
        const existingadmin = await admin.findOne({Email})
        existingadmin ? console.log("registerAdmin :: User Already exist") : null
        const avatar_url = await uploadOnCloudinary(avatar);
        const hashedpassword = await bcrypt.hash(Password ,10 )

        const newAdmin = new admin({
            UserName,
            Email,
            Password : hashedpassword,
            avatar:avatar_url?.url,
        })
        await newAdmin.save();
        return res.status(201).json({message:"Admin Regsiter :: User Registered Succeessfully"})
    } catch (error) {
        return res.status(400).json({message:"Admin Controller :: Did Not register" , error} )
    }
}


const LoginAdmin = async(req,res)=>{
    const {Email , Password }= req.body
    try {
        if(!Email || !Password){
            console.log("LoginAdmin :: All Fields are required")
        }
        const user = await admin.findOne({Email}) 
        console.log(user)
        const decryptedpassword = await bcrypt.compare(Password, user.Password) 
        console.log(decryptedpassword)   
        if(decryptedpassword){     
            const VerificationCode = Math.floor(100000 + Math.random()*900000).toString()
            console.log(VerificationCode)
            user.VerificationCode = VerificationCode;
            await user.save();
            sendMail(Email , VerificationCode)
            console.log("LoginAdmin :: Verification Code sent Successfully")
        }
        return res.status(201).json({message:"LoginAdmin :: Admin Login Successfull"})
    } catch (error) {
        return res.status(400).json({message : "LoginAdmin :: Could not Login as admin" , error})
    }
}


const verifyCode = async(req,res)=>{
    const {Email}=req.body;
    const {Code}= req.body;
   try {
     if(!Code){
         console.log("VerifyCode :: Please Enter a Valid Code")
     }
     const user = await admin.findById(Email)
     const vcode = user.VerificationCode
     const {accessToken , refreshToken} = await generateAccessandRefreshToken(user._id)
     if(vcode === Code){
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
         user.VerificationCode = undefined;
         user.isVerified = true;
         return res.status(201).json({message : "verifyCode :: Code Verification Successfull"})
     }else{
         return res.status(400).json({message:"verifyCode :: Code Was not verified/ Invalid Code"})
     }
   } catch (error) {
    return res.status(400).json({message:"VerifyCode :: Did Not work"})
   }
}

const LogoutAdmin = async(req,res)=>{
     const userId = req.user._id;
     try {
        const user = await admin.findByIdAndUpdate(
           {
               userId
           },
           {
               $set:{refreshToken:undefined}
           },
           {
               new : true,
           }
        )
        localStorage.clear('accessToken')
        localStorage.clear('refreshToken')
        return res.status(201).json({message:"LogoutAdmin :: Admin LoggedOut Successfully"})
     } catch (error) {
        return res.status(400).json({message:"LogoutAdmin :: Not LoggedOut "})
     }
}

const createPost = async(req,res)=>{
    const userId = req.user._id;
    const Image = req.file?.path
    const {status ,Address,coordinates}=req.body;

    try {
        if(!Image || !status || !Address || !coordinates){
            console.log("createPost :: All Fields are Required")
        }
        const image_url = await uploadOnCloudinary(Image);
        const Post = new post({
           Image : image_url.url,
           Address ,
           propertyStatus : status ,
           location : {
            type : 'Point',
            coordinates,
           },
           owner : userId,
        })
        await Post.save()
        if(!Post){
            console.log("CreatePost :: Post Could not be Created")
        }
        return res.status(201).json({message : "CreatePost :: Post Created Successfully"})
    } catch (error) {
        return res.status(400).json({message:"AdminPost :: Post Was not created "})
    }
}

const deletePost = async(req,res)=>{
    const userId = req.user._id;
    const postId = req.params.postId;
    try {
        if(!postId){
           return res.status(404).json({message:"DeletePost :: No Post Found to delete"})
        }
        const DeletedPost = await post.findOneAndDelete(
            {
                _id :postId,
                owner : userId,
            },
        )
        if(!DeletedPost){
            return res.status(400).json({message :"DeletePost :: Post not found or unauthorized"})
        }
        return res.status(200).json({message:"DeletePost :: Post Deleted Successfully"},DeletedPost);
    } catch (error) {
        return res.status(400).json({message:"DeletePost :: Post Could not be deleted"})
    }
}


const deleteAllPost = async(req,res)=>{
    const userId = req.user._id;
    try {
        if(!userId){
            console.log("Admin :: User NOt found")
        }
        const deletedPosts = await post.findOneAndDelete(
            {
                owner : userId,
            }
        )
        if(!deletedPosts){
            return res.status(400).json({message:"Admin :: All Posts Colud not be deleted"})
        }else{
            return res.status(200).json({message:"Admin :: All Post Deleted Successfully"},deletedPosts)
        }
    } catch (error) {
        return res.status(400).json({message:"Admin :: Posts Could not be Deleted"})
    }
}


const updatePost = async(req,res)=>{
    const Image = req.file?.path
    const postId = req.params.postId
    const userId = req.user_id
    const {status } = req.body;
    try {
      if(!postId || !userId){
        return res.status(400).json({message:"Admin :: Invalid PostId or User Not found"})
      }
      const image_url = await uploadOnCloudinary(Image)
      const UpdatedPost = await new post.findByIdAndUpdate(
        {
            _id:postId
        },
        {
            Image : image_url.url,
            propertyStatus:status,
        },
        {
            new : true
        }
      )
      return res.status(201).json({message:"Admin :: Post Updated Successfully"},UpdatedPost)
    } catch (error) {
        return res.status(400).json({message:"Admin :: Post Could not be Updated"})
    }
}




export {
    regitserAsAdmin,
    LoginAdmin,
    verifyCode ,
    LogoutAdmin ,
    createPost,
    deletePost,
    deleteAllPost,
    updatePost
}