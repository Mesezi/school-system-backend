import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { StudentModel } from "../../models/studentModel";

export const addStudentController = asyncHandler(
  async (req: any, res: any) => {
    //Destructuing the inputs from req.body
    const data = req.body;
    const schoolId = req.userData.schoolId;
    const requiredFields = [
        'email', 'password', 'dob', 'sex', "firstName", "lastName"
      ];

    // Check required fields for Student schema
    const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields in student information: ${missingFields.join(', ')}`
      });
    }

    try {
      const verifyEmail = await StudentModel.findOne({
        email: data.email,
      });

      if (verifyEmail) {
        return res.status(403).json({
          message: "Email already used",
        });
      }
      const studentId = uuidv4();
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const studentDetails = new StudentModel({
        ...data,
        id: studentId,
        accountType: "student",
        password: hashedPassword,
        schoolId,
      });

      const studentDetailsRes = await studentDetails.save();

      if (studentDetailsRes) {
        return res.status(201).json({
          message: "Class successfully created!",
          result: studentDetailsRes,
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
