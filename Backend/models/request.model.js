import mongoose , {Schema} from 'mongoose';
import {User} from '../models/user.model.js';


const requestSchema = new Schema({
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    unique:true
  },
  messagefromUser:{
    type : String,
  },
  propertyId:{
    type:String,
    required:true,
    unique:true
  },
  contactLink:{
    type:String,
  },
  status:{
    type:String,
    enum:['Pending','Accepted','Rejected'],
    default:'Pending'
  },
  usersPhone:{
    type:String,
    required:true

},
  usersEmail:{
    type:String,
     required:true
  },
  requestDate:{
    type:Date,
    default:Date.now
  }

},{timestamps:true})

export const request = mongoose.model('request',requestSchema)