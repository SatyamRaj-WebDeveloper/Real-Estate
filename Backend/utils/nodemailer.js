import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port:587,
    secure : false,
    auth:{
        user : "test.accoutfortesting@gmail.com",
        pass : "ziyh hvyh jtpv mwqv"
    }
})

