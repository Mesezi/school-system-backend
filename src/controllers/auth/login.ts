import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AdminUserModel } from "../../models/userModel";
import SchoolModel from "../../models/schoolModel";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { io } from "../..";

export const login = asyncHandler(async (req: any, res: any) => {
  //Destructing the inputs from req.body
  const { email, password, type } = req.body;

  console.log('hi')
  // io.broadcast.emit('joinRoom', { schoolId:'testt' })
  try {
    let user;
    if (type === "superAdmin") {
      user = await AdminUserModel.findOne({
        email: email,
      });
    } else if (type === "student") {
      return res.status(401).json({
        message: "Incorrect account type",
      });
    } else if (type === "classTeacher") {
      return res.status(401).json({
        message: "Incorrect account type",
      });
    }

    if (!user) {
      //if user does not exist responding Authentication Failed
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    } else {
      let jwtToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
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
