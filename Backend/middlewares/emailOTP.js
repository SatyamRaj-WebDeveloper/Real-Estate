import { transporter } from "../utils/nodemailer.js";

const sendMail = async(Email , Vcode)=>{
    try {
         const info = await transporter.sendMail({
            from : '"Real Estate" <satyam.draughtsmancivil@gmail.com>',
            to : Email,
            subject : "Verification",
            text : "Verify Your email",
            html : Vcode
         })
         console.log("Message Sent Successfully " , info)
    } catch (error) {
        console.log("sendMail :: Error in sending Mail" , error.message)
    }
}

export{sendMail}