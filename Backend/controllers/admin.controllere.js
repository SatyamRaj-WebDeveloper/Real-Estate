import {admin} from '../models/adminuser.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { sendMail } from '../middlewares/emailOTP.js';
import { post } from '../models/post.model.js';
import bcrypt from 'bcrypt';
import { request } from '../models/request.model.js';

const generateAccessandRefreshToken = async(userId)=>{
     try {
       const user = await admin.findById(userId)
       if(!user){
        console.log("generateAccessandRefreshToken :: admin user not found")
       }else{
       const accessToken = user.generateAccessToken()
       const refreshToken = user.generaterefreshToken()
       user.refreshToken = refreshToken;
       await user.save({validateBeforeSave:false})
       return {accessToken , refreshToken}
       }
     } catch (error) {
        console.log("AdminLogin :: Tokens not generated")
     }
}



const regitserAsAdmin = async(req,res)=>{
    const {UserName , Email , Password}=req.body;
    const Image = req.file?.path;
    console.log(UserName,Email,Password,Image)
    try {
        // console.log(UserName , Email , Password)
        if(!UserName || !Email || !Password){
          console.log("Admin Reguster :: All Fields are required")
        }
        const existingadmin = await admin.findOne({Email})
        existingadmin ? console.log("registerAdmin :: User Already exist") : null
        const avatar_url = await uploadOnCloudinary(Image);
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
    console.log(Email,Password)
    try {
        if(!Email || !Password){
            console.log("LoginAdmin :: All Fields are required")
        }
        const user = await admin.findOne({Email}) 
        if(!user){
            return res.status(404).json({message:"Invalid Email"})
        }
        const decryptedpassword = await bcrypt.compare(Password, user.Password)  
        if(decryptedpassword){     
            const VerificationCode = Math.floor(100000 + Math.random()*900000).toString()
            user.VerificationCode = VerificationCode
            await user.save();
            sendMail(Email , VerificationCode)
            console.log("LoginAdmin :: Verification Code sent Successfully")
        }
        return res.status(201).json({message:"LoginAdmin :: Admin Login Successfull"})
    } catch (error) {
        return res.status(400).json({message : "LoginAdmin :: Could not Login as admin" , error})
    }
}

const getCurrentUser = async(req,res)=>{
    const userId = req.user._id;
    if(!userId){
        return res.status(404).json({message:'Invalid User Id'})
    }
    try {
         const user = await admin.findById(userId)
         if(!user){
           return res.status(404).json({message:"No user Found"})
         }
         return res.status(200).json({message:"User Fetched Successfully" , data:user})
    } catch (error) {
        return res.status(400).json({message:'User Controller :: get Current User function did not work'})
    }
}

const verifyCode = async(req,res)=>{
    const {Email}=req.body;
    const {Code}= req.body;
   try {
     if(!Code){
         console.log("VerifyCode :: Please Enter a Valid Code")
     }
     const user = await admin.findOne({Email})
     const vcode = user.VerificationCode;
     if(Code === vcode){
        const {accessToken , refreshToken}= await generateAccessandRefreshToken(user._id)
         user.VerificationCode = undefined;
         user.isVerified = true;
         await user.save()
         return res.status(201).json({message : "verifyCode :: Code Verification Successfull" , data : {
            accessToken , refreshToken
         }})
     }else{
         return res.status(400).json({message:"verifyCode :: Code Was not verified/ Invalid Code"})
     }
   } catch (error) {
    return res.status(400).json({message:"VerifyCode :: Did Not work"})
   }
}

const LogoutAdmin = async(req,res)=>{
     const userId = req.user;
     try {
        const user = await admin.findByIdAndUpdate(
            userId,
           {
               $set:{refreshToken:undefined}
           },
           {
               new : true,
           }
        )
        console.log(user)
        // localStorage.clear('accessToken')
        // localStorage.clear('refreshToken')
        return res.status(201).json({message:"LogoutAdmin :: Admin LoggedOut Successfully"})
     } catch (error) {
        return res.status(400).json({message:"LogoutAdmin :: Not LoggedOut ",error})
     }
}

const createPost = async(req,res)=>{
    const userId = req.user._id;
    const Image = req.file?.path
    const {status ,Address,coordinates,Price}=req.body;
   
    try {
        if(!Image || !status || !Address ){
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
           Price,
           owner :req.user.UserName
        })
        await Post.save()
        if(!Post){
            console.log("CreatePost :: Post Could not be Created")
        }
        return res.status(201).json({message : "CreatePost :: Post Created Successfully" , data :{Post}})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"AdminPost :: Post Was not created ",error})
    }
}

const deletePost = async(req,res)=>{
    const postId = req.params.postId;
    try {
        if(!postId){
           return res.status(404).json({message:"DeletePost :: No Post Found to delete"})
        }
        const DeletedPost = await post.findOneAndDelete(
            {
                _id :postId,
            },
        )
        if(!DeletedPost){
            return res.status(400).json({message :"DeletePost :: Post not found or unauthorized"})
        }
        return res.status(200).json({message:"DeletePost :: Post Deleted Successfully",DeletedPost});
    } catch (error) {
        return res.status(400).json({message:"DeletePost :: Post Could not be deleted" ,error})
    }
}


const deleteAllPost = async(req,res)=>{
    const userId = req.user;
    try {
        if(!userId){
            console.log("Admin :: User NOt found")
        }
        const deletedPosts = await post.findOneAndDelete(
            {
                owner : userId.UserName,
            }
        )
        if(!deletedPosts){
            return res.status(400).json({message:"Admin :: All Posts Colud not be deleted"})
        }else{
            return res.status(200).json({message:"Admin :: All Post Deleted Successfully",deletedPosts})
        }
    } catch (error) {
        return res.status(400).json({message:"Admin :: Posts Could not be Deleted"})
    }
}

const getPosts =async(req,res)=>{
    const userId= req.user._id;
    try {
        const user = await admin.findById({_id : userId})
        if(!user){
            return res.status(404).json({message:"No User Found"})
        }
        const posts = await post.find(
            {
                owner: user.UserName
            }
        )
        if(!posts){
            return res.status(404).json({message:"No Post created Yet"})
        }else{
            return res.status(200).json({message:"Posts Fetched Successfully",posts})
        }
    } catch (error) {
        return res.status(400).json({message:"Get Posts Function did not work"})
    }
}

const updatePost = async(req,res)=>{
    const Image = req.file?.path
    const postId = req.params.postId
    const userId = req.user._id
    const {status,price } = req.body;
    
    console.log(Image,price,status)
    try {
      if(!postId || !userId){
        return res.status(400).json({message:"Admin :: Invalid PostId or User Not found"})
      }
      const image_url = await uploadOnCloudinary(Image)
      const UpdatedPost = await post.findByIdAndUpdate(
        {
            _id:postId
        },
        {
            Image : image_url.url,
            propertyStatus:status,
            Price : price
        },
        {
            new : true
        }
      )
      return res.status(201).json({message:"Admin :: Post Updated Successfully",UpdatedPost})
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message:"Admin :: Post Could not be Updated" , error})
    }
}

const approverequest = async(req,res)=>{
    const requestId = req.params.requestId;
   try {
     if(!requestId){
         return res.status(404).json({message:"Approverequest :: Invalid requestId"})
     }
     const Request = await request.findById(requestId)
     if(!Request){
         return res.status(404).json({message:'ApproveRequest :: No request Found'})
     }
     Request.status = "Approved"
     await Request.save();
     return res.status(200).json({message:"Approve Request :: Request Approved Successfully",data:{Request}})
   } catch (error) {
      return res.status(400).json({message:"Approve Request :: approverequest function failed !"})
   }
}

const rejectRequest = async(req,res)=>{
    const requestId = req.params.requestId;
   try {
     if(!requestId){
         return res.status(404).json({message:"Reject Request :: Invalid requestId"})
     }
     const Request = await request.findById(requestId)
     if(!Request){
         return res.status(404).json({message:'Reject Request :: No request Found'})
     }
     Request.status = "Rejected";
     await Request.save();
     return res.status(200).json({message:"Reject Request :: Request Rejected Successfully" , data:{Request}})
   } catch (error) {
      return res.status(400).json({message:"Reject Request :: rejectRequest function failed !"})
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
    updatePost,
    approverequest,
    rejectRequest,
    getCurrentUser,
    getPosts
}