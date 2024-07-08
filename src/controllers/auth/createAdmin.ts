import bcrypt from "bcryptjs";
import { AdminModel } from '../../models/adminModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import encryptText from "../../lib/encryptText";


export const createAdmin = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
  const { firstName, lastName, username, password, phoneNumber, role, sex, namePrefix } = req.body;
  const schoolId = req.userData.schoolId;

  if (!schoolId) {
    return res.status(404).json({ message: "School id not found" });
  }

  const currentAdmins =  await AdminModel.find({ schoolId });
  
  if(currentAdmins?.length === 3){
    return res.status(403).json({
        message: "You have reached max admin accounts",
      });
  }

  //Verifying the email address inputed is not used already
  const verifyUsername = await AdminModel.findOne({ username: username });

  try {
    if (verifyUsername) {
      return res.status(403).json({
        message: "Username already exists",
      });
    } else {
      //generating userId
      try {
        const userId = uuidv4();
        
        const encryptedPassword = encryptText(password);
        const user = new AdminModel({
          id: userId,
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: encryptedPassword,
          phoneNumber: phoneNumber,
          accountType: 'admin',
          role: role,
          sex,
          namePrefix,
          lastLoggedIn: new Date(),
          schoolId
        });

        const savedUser = await user.save();
       
        if (savedUser) {
          return res.status(201).json({
            message: "Admin account successfully created!",
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

