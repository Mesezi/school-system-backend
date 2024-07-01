import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";


export const register = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
  const { firstName, lastName, schoolName, 
     email, password, phoneNumber, role, sex, namePrefix } = req.body;

  //Verifying the email address inputed is not used already
  const verifyEmail = await AdminUserModel.findOne({ email: email });
  try {
    if (verifyEmail) {
      return res.status(403).json({
        message: "Email already used",
      });
    } else {
      //generating userId
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
          accountType: 'superAdmin',
          role: role,
          sex,
          namePrefix,
          lastLoggedIn: new Date(),
          schoolId
        });



    // Calculate the date 60 days from now
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 60);

        const school = new SchoolModel({
          id: schoolId,
          subscriptionEndDate: futureDate,
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
    }
  } catch (error:any) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
});

