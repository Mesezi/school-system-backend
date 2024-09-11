import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ClassModel } from "../../models/classModel";
import asyncHandler from "express-async-handler";
import decryptText from "../../lib/decryptText";

export const loginClass = asyncHandler(async (req: any, res: any) => {
  //Destructing the inputs from req.body
  const { username, password } = req.body;

  try {
    let classAccount = await ClassModel.findOne({
            username,
          });


    if (!classAccount) {
      //if user does not exist responding Authentication Failed
      return res.status(401).json({
        message: "Authentication failed: Class not found.",
      });
    }

    const checkPassword = decryptText(classAccount?.password) === password;

    if (!checkPassword) {
      return res.status(401).json({
        message: "Authentication failed: Incorrect password.",
      });
    } else {
      // Update the lastLoggedIn property to the current date and time
      classAccount.lastLoggedIn = new Date();
      await classAccount.save();
      let jwtToken = jwt.sign(
        {
          username: classAccount.username,
          userId: classAccount.id,
          schoolId: classAccount.schoolId,
          accountType: classAccount.accountType,
        },
        //Signign the token with the JWT_SECRET in the .env
        process.env.JWT_SECRET ?? ""
        // {
        //   expiresIn: "1h",
        // }
      );

    //   let userData = await ClassModel.findOne({ username }).select(
    //     "-password -__v -_id"
    //   );

      return res.status(200).json({
        accessToken: jwtToken,
        user: classAccount,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});
