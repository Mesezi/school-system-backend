import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { ClassModel } from "../../models/classModel";


export const updateClassSubjects = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
 const updateData = req.body;
 const {classId} = req.params
 const schoolId = req.userData.schoolId;
 if(!Array.isArray(updateData)){
    return res.status(404).json({ message: "Invalid data type" }); 
 }

 if (!schoolId) {
   return res.status(404).json({ message: "School id not found" });
 }
 
 try {
   // Update the school document by its ID
   const updatedClass = await ClassModel.findOneAndUpdate({ schoolId, id:classId },
     {subjects: updateData}, { new: true });

   if (!updatedClass) {
     return res.status(404).json({ message: 'Class not found' });
   }

   res.status(200).json({
     success: true,
     message: 'Updated class subjects',
   });
 } catch (error) {
   console.error('Error updating school:', error);
   res.status(500).json({ message: 'Internal server error' });
 }

});
