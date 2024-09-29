import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './DB/dbconnect.js';

const app = express();
const PORT = process.env.PORT || 8000


dotenv.config(
  { path : './.env'}
)
app.use(express.json())
dbConnect().then(()=>{
    console.log("Database Connected Successfully")
}).catch((error)=>{
    console.log("Error In DB Connection" , error.message)
})

//routes

import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js';

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin',  adminRoutes);

app.listen(PORT , ()=>{
    console.log(`App Running on Port ${PORT}`)
})