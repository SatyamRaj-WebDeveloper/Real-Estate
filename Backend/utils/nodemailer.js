import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port:587,
    secure : false,
    auth:{
        user : "satyam.draughtsmancivilAgmail.com",
        pass : "jaqs zivw gicd bhla"
    }
})

