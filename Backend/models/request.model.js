import mongoose , {Schema} from 'mongoose';
import {User} from '../models/user.model.js';


const requestSchema = new Schema({
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
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
    enum:['Pending','Approved','Rejected'],
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
    default:Date.now().toString()
  }

},{timestamps:true})

export const request = mongoose.model('request',requestSchema)