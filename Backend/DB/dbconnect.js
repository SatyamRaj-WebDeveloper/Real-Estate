import mongoose from 'mongoose'

const dbConnect  =async()=>{
   try {
    await mongoose.connect(`mongodb+srv://SatyamRaj:Satyam123@cluster0.zwfdxin.mongodb.net/RealState`)
    console.log("Connected Successfully")
   } catch (error) {
    console.log('Could not Connect to Database Inside DBconnect function' ,error.message)
   }
}

export { dbConnect}