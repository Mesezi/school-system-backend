import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AdminUserModel } from "../../models/userModel";
import asyncHandler from "express-async-handler";
import encryptText from "../../lib/encryptText";
import { removeKeys } from "../../util/removeKeys";

export const loginUserAccount = asyncHandler(async (req: any, res: any) => {
  //Destructing the inputs from req.body
  const { email, password } = req.body;

  try {
    let user = await AdminUserModel.findOne({
      email
    });

    if (!user) {
      //if user does not exist responding Authentication Failed
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    if(user.accountType === 'admin' || user.accountType === 'class'){
      return res.status(401).json({
        message: "Wrong account type",
      });
    }
    

    const checkPassword = await bcrypt.compare(password, user.password) 

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
        // {
        //   expiresIn: "1h",
        // }
      );

      let userData = await AdminUserModel.findOne({ email }).select('-password -__v -_id');


      return res.status(200).json({
        accessToken: jwtToken,
        user: userData,
      });
    }
  } catch (err: any) {
    return res.status(401).json({
      messgae: err.message,
      success: false,
    });
  }
});
