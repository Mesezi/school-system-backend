import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AdminUserModel } from "../../models/userModel";
import SchoolModel from "../../models/schoolModel";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

export const login = asyncHandler(async (req: any, res: any) => {
  //Destructing the inputs from req.body
  const { email, password, type } = req.body;

  try {
    let user;
    if (type === "superAdmin") {
      user = await AdminUserModel.findOne({
        email: email,
      });
    } else if (type === "student") {
      return;
    } else if (type === "classTeacher") {
      return;
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
          expiresIn: "30m",
        }
      );
      return res.status(200).json({
        accessToken: jwtToken,
        userId: user.id,
      });
    }
  } catch (err: any) {
    return res.status(401).json({
      messgae: err.message,
      success: false,
    });
  }
});
