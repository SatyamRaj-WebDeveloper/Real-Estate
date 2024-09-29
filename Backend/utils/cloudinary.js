import {v2 as cloudinary} from 'cloudinary';
import { FILE } from 'dns';
import fs from 'fs';


cloudinary.config({
    cloud_name : 'ddtzeeazz' ,
    api_key : '344626612553335'  ,
    api_secret : 'P557-6uWGWtjMXn99_BD3WU4A_U',
})

const uploadOnCloudinary = async(FilePath)=>{
    try {
        if(!FilePath){
            console.log("Cloudinary :: File Not recieved");
        }
       const url = await cloudinary.uploader.upload(FilePath);
       fs.unlinkSync(FilePath)
       return url;
    } catch (error) {
        if((fs.existsSync(FilePath)))
            fs.unlinkSync(FilePath)
        console.log("Cloudinary :: Upload did not work")
    }
}

export { uploadOnCloudinary}
