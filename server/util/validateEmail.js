// Node.js packages
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const validateEmail = (username, email, reason) => {
    let message;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
      
    const token = jwt.sign({
            data: 'Token Data'  
        }, process.env.SECRET_KEY, { expiresIn: '10m' }  
    ); 

    // The route ${process.env.REGISTRATION}/testmaker.auth/verify/${email}/${token} is located in another GitHub repository for security reasons
    if(reason === 'newUser') {
        message = `Hi ${username}! You have recently visited 
        Test Maker and entered your email.
        Please follow the given link to verify your email
        ${process.env.REGISTRATION}/testmaker/auth/verify/${email}/${token} 
        Thanks!`
    }
    else if(reason === 'login') {
        message = `Hello ${username}! Please verify your email
        ${process.env.REGISTRATION}/testmaker/auth/verify/${email}/${token} 
        Thanks!`
    }
      
    const mailConfigurations = {
        from: 'joshua001testmaker@gmail.com',
        to: email,
        subject: 'Email Verification for Test Maker',
        text: message
    };
      
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) {
            console.log(error);
            throw Error(error);
        }
        else {
            console.log('Email Sent Successfully');
            console.log(info);
        }
    });
}

module.exports = validateEmail;