import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AdminModel } from "../../models/adminModel";
import asyncHandler from "express-async-handler";
import decryptText from "../../lib/decryptText";

export const loginAdmin = asyncHandler(async (req: any, res: any) => {
  //Destructing the inputs from req.body
  const { username, password } = req.body;

  try {
    let user = await AdminModel.findOne({
            username,
          });

    if (!user) {
      //if user does not exist responding Authentication Failed
      return res.status(401).json({
        message: "Authentication failed: User not found.",
      });
    }

    const checkPassword = decryptText(password) === user.password;

    if (!checkPassword) {
      return res.status(401).json({
        message: "Authentication failed: Incorrect password.",
      });
    } else {
      // Update the lastLoggedIn property to the current date and time
      user.lastLoggedIn = new Date();
      await user.save();
      let jwtToken = jwt.sign(
        {
          username: user.username,
          userId: user.id,
          schoolId: user.schoolId,
          accountType: user.accountType,
        },
        //Signign the token with the JWT_SECRET in the .env
        process.env.JWT_SECRET ?? ""
        // {
        //   expiresIn: "1h",
        // }
      );

    //   let userData = await AdminModel.findOne({ username }).select(
    //     "-password -__v -_id"
    //   );

      return res.status(200).json({
        accessToken: jwtToken,
        user: user,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      messgae: err.message,
      success: false,
    });
  }
});
