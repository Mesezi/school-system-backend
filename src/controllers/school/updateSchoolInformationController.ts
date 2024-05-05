import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";


export const updateSchoolInformation = asyncHandler(async (req:any, res:any) => {
  const updateData = req.body;
  const schoolId = req.userData.schoolId;

  const schema = {
    schoolShortName: String,
    schoolAddress: String,
    schoolLogo: String,
    schoolEmail: String,
    schoolColor: String,
    schoolGradingSystem: {
      test1: Number,
      test2: Number,
      exam: Number,
    }
  };
  
// Check if all keys are present in updateData
const requiredKeys = Object.keys(schema);
const actualKeys = Object.keys(updateData);
const missingFields = requiredKeys.filter(key => !actualKeys.includes(key));
if (missingFields.length > 0) {
  return res.status(400).json({
    success: false,
    message: `Missing fields in school information: ${missingFields.join(', ')}`
  });
}

const gradingSystemKeys = Object.keys(schema.schoolGradingSystem);
const actualGradingSystemKeys = Object.keys(updateData.schoolGradingSystem);
const missingGradingSystemFields = gradingSystemKeys.filter(key => !actualGradingSystemKeys.includes(key));
if (missingGradingSystemFields.length > 0) {
  return res.status(400).json({
    success: false,
    message: `Missing fields in school grading system: ${missingGradingSystemFields.join(', ')}`
  });
}

  if (!schoolId) {
    return res.status(404).json({ message: "School id not found" });
  }

  try {
    // Update the school document by its ID
    const updatedSchool = await SchoolModel.findOneAndUpdate({ id:schoolId }, {schoolInformation: updateData}, { new: true });

    if (!updatedSchool) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Updated school information',
    });
  } catch (error) {
    console.error('Error updating school:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
