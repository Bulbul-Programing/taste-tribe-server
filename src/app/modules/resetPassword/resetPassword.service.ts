import axios from "axios"
import { sendMail } from "../../utils/sendMail"
import { TResetPassword, TValidateCode } from "./resetPassword.interface"
import { resetPasswordModel } from "./resetPassword.model"
import AppError from "../../error/AppError"
import { userModel } from "../user/user.model"
import { createToken } from "../auth/auth.utils"
import config from "../../config"

const resetPasswordIntoDB = async (payload: TResetPassword) => {
  const isUserExist = await userModel.findOne({ email: payload.email })
  if (!isUserExist) {
    throw new AppError(401, 'User not found')
  }

  const jwtPayload = {
    email: payload.email,
  }

  const generateToken = createToken(jwtPayload, config.resetPasswordSecrete as string, '1m')

  const resetPasswordUrl = `http://localhost:3000/`

  // const data = {
  //   tempPassword,
  //   email: payload.email
  // }
  // const sendMailData = {
  //   to: payload.email,
  //   subject: 'Reset Your Password - Test Tribe',
  //   text: `Hello,

  //   We received a request to reset your password for your Test Tribe account. Use the following 6-digit code to reset your password:

  //   Reset Code: ${tempPassword}

  //   If you did not request a password reset, please ignore this email.

  //   Best regards,
  //   Test Tribe Support Team`,
  //   html: `<!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>Reset Password</title>
  //     <style>
  //       body {
  //         margin: 0;
  //         padding: 0;
  //         background-color: #f5f5f5;
  //         font-family: Arial, sans-serif;
  //       }
  //       .container {
  //         display: flex;
  //         justify-content: center;
  //         align-items: center;
  //         min-height: 100vh;
  //         background-color: #f5f5f5;
  //       }
  //       .email-wrapper {
  //         width: 100%;
  //         background-color: #ffffff;
  //         border-radius: 8px;
  //         overflow: hidden;
  //         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  //         text-align: center;
  //         padding: 20px;
  //         box-sizing: border-box;
  //       }
  //       .header {
  //         background-color: #1BEEA2;
  //         padding: 20px 0;
  //       }
  //       .header img {
  //         width: 100px;
  //         border-radius: 50%;
  //         background-color: white;
  //       }
  //       .content h1 {
  //         font-size: 24px;
  //         color: #333333;
  //         margin: 20px 0;
  //       }
  //       .content p {
  //         font-size: 16px;
  //         color: #555555;
  //         margin: 10px 0;
  //         line-height: 1.6;
  //       }
  //       .reset-code {
  //         display: inline-block;
  //         background-color: #1BEEA2;
  //         color: #ffffff;
  //         font-size: 28px;
  //         font-weight: bold;
  //         letter-spacing: 4px;
  //         padding: 15px 30px;
  //         border-radius: 8px;
  //         margin: 20px 0;
  //         text-decoration: none;
  //       }
  //       .footer p {
  //         font-size: 12px;
  //         color: #aaaaaa;
  //         margin: 20px 0 0;
  //       }
  //       .footer p a {
  //         color: #1BEEA2;
  //         text-decoration: none;
  //       }
  //       .expire{
  //         color: #1BEEA2;
  //         font-weight : 900;
  //       }
  //     </style>
  //   </head>
  //   <body>
  //     <div class="container">
  //       <div class="email-wrapper">
  //         <!-- Header with Logo -->
  //         <div class="header">
  //           <img src="https://res.cloudinary.com/depy0i4bl/image/upload/v1730037173/freepik-green-food-restaurant-logo-20241027135236jBOI_lptvtg.png" alt="Test Tribe Logo">
  //         </div>

  //         <!-- Main Content -->
  //         <div class="content">
  //           <h1>Reset Your Password</h1>
  //           <p>Hello,</p>
  //           <p>We received a request to reset your password for your <strong>Test Tribe</strong> account. Use the following 6-digit code to reset your password:</p>
  //           <div class="reset-code">${tempPassword}</div>
  //           <div class="expire">expire in 1 minute</div>
  //           <p>If you did not request this password reset, you can safely ignore this email. This code will expire shortly, so please use it as soon as possible.</p>
  //         </div>

  //         <!-- Footer -->
  //         <div class="footer">
  //           <p>Thank you for being part of Test Tribe!</p>
  //           <p>&copy; ${new Date().getFullYear()} Test Tribe. All rights reserved.</p>
  //         </div>
  //       </div>
  //     </div>
  //   </body>
  //   </html>`
  // }

  // const info = await sendMail(sendMailData);
  // if (info.accepted) {
  //   await resetPasswordModel.create(data)
  //   return {
  //     message: 'Reset Password mail sent successfully!',
  //   }
  // }

  // return {
  //   message: 'something went wrong!',
  // }
}

const validateCodeIntoDB = async (payload: TValidateCode) => {
  // console.log(payload);
  const isExist = await resetPasswordModel.findOne({ email: payload.email, tempPassword: payload.code })
  console.log(isExist);
  if (!isExist) {
    throw new AppError(404, 'Invalid Reset Code')
  }
  else {
    return {
      message: 'Reset Code is valid!',
    }
  }
}

export const resetPasswordService = {
  resetPasswordIntoDB,
  validateCodeIntoDB
}