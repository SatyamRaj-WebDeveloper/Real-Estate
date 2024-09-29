import mongoose , {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    UserName : {
        type : String , 
        required : true ,
        unique : true ,
    },
    Email : {
        type : String,
        required : true,
        unique :true,
    },
    Password : {
        type : String ,
        unique :true ,
        required : true
    },
    refreshToken :{
        type : String ,
        unique : true
    },
    Image :{
        type : String,
        unique : true,
    }
},{timestamps : true})



UserSchema.methods.generateAccessToken =  function (){
    return  jwt.sign(
       {
         _id : this._id ,
          Email : this.Email,
          UserName : this.UserName,
       },
       process.env.ACCESS_TOKEN,
       {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
       }
    )
}
UserSchema.methods.generaterefreshToken =  function (){
    return  jwt.sign(
       {
         _id : this._id ,
       },
       process.env.REFRESH_TOKEN,
       {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
       }
    )
}

export const User =  mongoose.model('simpleUser' , UserSchema);