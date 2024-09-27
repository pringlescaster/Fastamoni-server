import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const sendEmail = async (recipient, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });


    const mailOptions= {
       from: process.env.EMAIL_USER,
       to:  recipient,
       subject: subject,
       text: message, 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Error sending email:', error.message);
    }
};

export default sendEmail;