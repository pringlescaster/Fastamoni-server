import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config(); // Ensure this is called first

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;



// Create a Twilio client
const client = new twilio(accountSid, authToken);

const sendSMS = async (recipient, message) => {
    try {
        await client.messages.create({
            body: message,
            to: recipient,
            from: twilioPhoneNumber,
        });
        console.log('SMS sent successfully');
    } catch (error) {
        console.error('Error sending SMS:', error.message);
    }
};

export default sendSMS;
