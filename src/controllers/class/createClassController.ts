import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";


export const createClassController = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
  const { firstName, lastName, schoolName, 
     email, password, phoneNumber } = req.body;


  
      try {
        const userId = uuidv4();
        const schoolId = uuidv4();
        //using bcrypt to hash the password sent from the user
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword)
        const user = new AdminUserModel({
          id: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
          phoneNumber: phoneNumber,
          accountType: 'class',
          schoolId
        });

        const school = new SchoolModel({
          id: schoolId,
          schoolName
        });

        await school.save();
        const savedUser = await user.save();
       

        if (savedUser) {
          return res.status(201).json({
            message: "Account successfully created!",
            result: savedUser,
            success: true,
          });
        }

      } catch (err) {
        res.status(500).json({
          error: err,
        });
      }
    
 
});

