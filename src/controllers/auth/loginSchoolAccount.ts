import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AdminUserModel } from "../../models/userModel";
import asyncHandler from "express-async-handler";
import encryptText from "../../lib/encryptText";
import decryptText from "../../lib/decryptText";

export const loginSchoolAccount = asyncHandler(async (req: any, res: any) => {
  //Destructing the inputs from req.body
  const { username, password } = req.body;

  try {
    let user = await AdminUserModel.findOne({
        username
    });

    if (!user) {
      //if user does not exist responding Authentication Failed
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }
    const checkPassword = password === decryptText(password)

    if (!checkPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    } else {
      let jwtToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
          schoolId: user.schoolId,
          accountType: user.accountType
        },
        //Signign the token with the JWT_SECRET in the .env
        process.env.JWT_SECRET ?? "",
        {
          expiresIn: "1h",
        }
      );
 // Emit joinRoom event with user ID and type
      return res.status(200).json({
        accessToken: jwtToken,
        user: user,
      });
    }
  } catch (err: any) {
    return res.status(401).json({
      messgae: err.message,
      success: false,
    });
  }
});
