import bcrypt from "bcryptjs";
import { AdminUserModel } from '../../models/userModel';
import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { ClassModel } from "../../models/classModel";


export const updateClassTimetable = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
 const updateData = req.body;
 const {classId} = req.params
 const schoolId = req.userData.schoolId;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const requiredKeys = ['startTime', 'endTime', 'subject', ];

    for (let day in updateData) {
        if (!daysOfWeek.includes(day)) {
            return res.status(400).json({
                success: false,
                message: `Invalid day: ${day} is not allowed.`
              });
          }
        }
  
    for (let day of daysOfWeek) {
      if (!(day in updateData)) {
        return res.status(400).json({
            success: false,
            message: `Missing day: ${day}`
          });
      } else if (!Array.isArray(updateData[day])) {
        return res.status(400).json({
            success: false,
            message: `${day} should be an array`
          });
      } else if (Array.isArray(updateData[day])) {
        updateData[day].forEach((entry:any, index:number) => {
          requiredKeys.forEach(key => {
            if (!entry.hasOwnProperty(key)) {
                return res.status(400).json({
                    success: false,
                    message: `Missing key '${key}' in ${day}`
                  });
            }
          });
        });
      }
    }


 if (!schoolId) {
   return res.status(404).json({ message: "School id not found" });
 }


 try {
   // Update the school document by its ID
   const updatedClass = await ClassModel.findOneAndUpdate({ schoolId, id:classId }, {timetable: updateData}, { new: true });

   if (!updatedClass) {
     return res.status(404).json({ message: 'Class not found' });
   }

   res.status(200).json({
     success: true,
     message: 'Updated class timetable',
   });
 } catch (error) {
   console.error('Error updating school:', error);
   res.status(500).json({ message: 'Internal server error' });
 }

});
