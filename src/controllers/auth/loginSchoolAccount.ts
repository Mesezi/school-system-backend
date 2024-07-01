import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import decryptText from "../../lib/decryptText";
import { ClassModel } from "../../models/classModel";

export const loginSchoolAccount = asyncHandler(async (req: any, res: any) => {
  // Destructuring the inputs from req.body
  const { userName, password, userType } = req.body;

  if (userType) {
    //if user does not exist responding Authentication Failed
    return res.status(401).json({
      message: "Authentication failed: User type not found.",
    });
  }

  try {
    let user = await ClassModel.findOne({
      userName,
    });

    if (!user) {
      // if user does not exist, respond with Authentication Failed
      return res.status(401).json({
        message: "Authentication failed: User not found.",
      });
    }

    const checkPassword = password === decryptText(password);

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
          username: user.userName,
          userId: user.id,
          schoolId: user.schoolId,
          accountType: user.accountType,
        },
        // Signing the token with the JWT_SECRET in the .env
        process.env.JWT_SECRET ?? "",

        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        accessToken: jwtToken,
        user: user,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
});
