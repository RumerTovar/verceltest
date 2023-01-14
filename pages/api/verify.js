import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { DgraphRegisterToken } from '../../utils/DgraphRegisterToken';

const appEmail = process.env.NEXT_PUBLIC_EMAIL;
const emailPassword = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
const localHomePage = process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE;

export default async function verify(req, res) {
 const { email } = req.body;

 const emailToken = jwt.sign(
  {
   email,
  },
  jwtSecret,
  { expiresIn: '24h' }
 );

 await DgraphRegisterToken(email, emailToken);

 const htmlMessage = `
 <!DOCTYPE html>
 <html>
 <head>
     <title>Reset your password</title>
 </head>
 <body>
     <h1>Hello,</h1>
     <p>We received a request to reset your password for your account. If you did not initiate this request, please ignore this email.</p>
     <p>To reset your password, please <a href="${localHomePage}/passwordRecovery/${emailToken}">click here</a>.</p>
     <p>This link will expire in 24 hours. If you continue to have trouble resetting your password, please contact our customer support team for assistance.</p>
     <p>Best regards,</p>
     <p>Experiences App</p>
 </body>
 </html>
 `;

 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   user: appEmail,
   pass: emailPassword,
  },
  tls: {
   rejectUnauthorized: false,
  },
 });

 const mailOptions = {
  from: appEmail,
  to: email,
  subject: 'Password reset request',
  html: htmlMessage,
 };

 transporter.sendMail(mailOptions, (err) => {
  if (err) {
   console.error(err);
  } else {
   console.log('email sent successfully!');
   return res.status(200).json({
    response: 'email sent successfully',
   });
  }
 });
}
