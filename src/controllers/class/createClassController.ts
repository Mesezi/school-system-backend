import bcrypt from "bcryptjs";
import { AdminUserModel } from "../../models/userModel";
import SchoolModel from "../../models/schoolModel";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import encryptText from "../../lib/encryptText";
import { generateRandomString } from "../../util/generateRandomString";
import { ClassModel } from "../../models/classModel";

export const createClassController = asyncHandler(
  async (req: any, res: any) => {
    //Destructuing the inputs from req.body
    const data = req.body;
    const schoolId = req.userData.schoolId;

    try {
      const verifyUserName = await AdminUserModel.findOne({
        username: data.userName,
      });

      if (verifyUserName) {
        return res.status(403).json({
          message: "Username already used",
        });
      }
      const classId = uuidv4();

      const schoolClass = new ClassModel({
        ...data,
        id: classId,
        accountType: "class",
        schoolId,
      });

      const savedSchoolClass = await schoolClass.save();

      if (savedSchoolClass) {
        return res.status(201).json({
          message: "Class successfully created!",
          result: savedSchoolClass,
          success: true,
        });
      }
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
);
