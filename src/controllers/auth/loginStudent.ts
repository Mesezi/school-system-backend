import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StudentModel } from "../../models/studentModel";
import asyncHandler from "express-async-handler";

export const loginStudent = asyncHandler(async (req: any, res: any) => {
  //Destructing the inputs from req.body
  const { email, password } = req.body;

  try {
    let user = await StudentModel.findOne({
      email,
    });

    if (!user) {
      //if user does not exist responding Authentication Failed
      return res.status(401).json({
        message: "Authentication failed: User not found.",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

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
          email: user.email,
          userId: user.id,
          schoolId: user.schoolId,
          accountType: user.accountType,
          classId: user?.classId ?? ''
        },
        //Signign the token with the JWT_SECRET in the .env
        process.env.JWT_SECRET ?? ""
        // {
        //   expiresIn: "1h",
        // }
      );

      let userData = await StudentModel.findOne({ email }).select(
        "-password -__v -_id"
      );

      return res.status(200).json({
        accessToken: jwtToken,
        user: userData,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      messgae: err.message,
      success: false,
    });
  }
});
