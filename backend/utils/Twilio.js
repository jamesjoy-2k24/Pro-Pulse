// import twilio from "twilio";
// import dotenv from "dotenv";
// dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = twilio(accountSid, authToken);

// export const sendSMS = async (to, message) => {
//   try {
//     await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//     });
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };
