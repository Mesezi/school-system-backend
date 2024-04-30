import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";


export const updateSchoolSessionAndTerm = asyncHandler(async (req:any, res:any) => {
//Destructuing the inputs from req.body
const { id } = req.params;
const updateData = req.body;
const schoolId = req.userData.schoolId;

if (!schoolId) {
  return res.status(404).json({ message: "School id not found" });
}


try {
  // Update the school document by its ID
  const updatedSchool = await SchoolModel.findOneAndUpdate({ id }, {schoolSessionAndTerm: updateData}, { new: true });

  if (!updatedSchool) {
    return res.status(404).json({ message: 'School not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Updated school session and term',
    data: updatedSchool,
  });
} catch (error) {
  console.error('Error updating school:', error);
  res.status(500).json({ message: 'Internal server error' });
}
});
