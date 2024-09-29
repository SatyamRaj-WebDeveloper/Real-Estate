import mongoose , {Schema} from "mongoose";

const adminSchema = new mongoose.Schema({
    UserName  : {
        type  :String ,
        required : true ,
        unique : true ,
    },
    Email : {
        type : String ,
        required : true ,
        unique : true ,
    },
    Password : {
        type : String,
        required : true,
        unique :true
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    VerificationCode : {
        type : String,
       
        unique :true
    },
    avatar:{
        type : String,
        unique : true,
    },
    refreshToken :{
        type :String ,
        unique : true,
        
    }
},{timestamps :true})

adminSchema.methods.hashpassword = function(Password){
    this.Password = bcrypt.hash(Password,10)
 }
 
 
 adminSchema.methods.generateAccessToken =  function (){
     return  jwt.sign(
        {
          _id : this._id ,
           Email : this.Email,
           UserName : this.UserName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
     )
 }
 adminSchema.methods.generaterefreshToken =  function (){
     return  jwt.sign(
        {
          _id : this._id ,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
         expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
     )
 }
 
export const admin =  mongoose.model('admin' , adminSchema)