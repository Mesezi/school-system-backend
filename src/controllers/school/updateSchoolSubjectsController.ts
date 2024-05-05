import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";


export const updateSchoolSubjects = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
 const updateData = req.body;
 const schoolId = req.userData.schoolId;

 if (!schoolId) {
   return res.status(404).json({ message: "School id not found" });
 }

 const allowedKeys = ['primary', 'juniorSecondary', 'seniorSecondary', 'nursery'];

 // Iterate over each key in updateData
 for (const key in updateData) {
   const value = updateData[key];

   // Check if the key is not one of the allowed keys
   if (!allowedKeys.includes(key)) {
     return res.status(400).json({
       success: false,
       message: `Invalid key: ${key}`
     });
   }

   // Check if the value is not an array or if any item in the array is not a string or is an empty string
   else if (!Array.isArray(value) || value.some(item => typeof item !== 'string' || !item.trim())) {
     return res.status(400).json({
       success: false,
       message: `Invalid value for key ${key}: ${value}`
     });
   }
 }


 try {
   // Update the school document by its ID
   const updatedSchool = await SchoolModel.findOneAndUpdate({ id:schoolId }, {schoolSubjects: updateData}, { new: true });

   if (!updatedSchool) {
     return res.status(404).json({ message: 'School not found' });
   }

   res.status(200).json({
     success: true,
     message: 'Updated school subjects',
   });
 } catch (error) {
   console.error('Error updating school:', error);
   res.status(500).json({ message: 'Internal server error' });
 }

});
