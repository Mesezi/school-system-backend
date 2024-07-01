import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";


export const updateSchoolGrade = asyncHandler(async (req:any, res:any) => {
  const updateData = req.body;
  const schoolId = req.userData.schoolId;

  if (!schoolId) {
    return res.status(404).json({ message: "School id not found" });
  }

  try {
    // Update the school document by its ID
    const school = await SchoolModel.findOne({id:schoolId});

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

     // Initialize schoolResultDetails if it's null or undefined
     if (!school.schoolResultDetails) {
        school.schoolResultDetails = {};
      }

    school.schoolResultDetails.grade = updateData;
    await school.save();
  
    res.status(200).json({
      success: true,
      message: 'Updated school grade',
    });
  } catch (error) {
    console.error('Error updating school:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});
