import mongoose,{Schema} from 'mongoose';

const postSchema =  new Schema({
    Image:{
        type : String,
        required: true ,
        unique : true,
    },
    Address:{
        type : String,
        required:true,
    },
    propertyStatus:{
        type : String,
        required: true,
        enum : ["For Sale" , "Rent"],
        unique:true,
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
    },
    owner:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

export const post = mongoose.model("post",postSchema)