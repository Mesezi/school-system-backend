import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import SchoolModel from "../../../models/schoolModel";


export const addSchoolAnnouncement = asyncHandler(async (req:any, res:any) => {

  const data = req.body
  const schoolId = req.userData.schoolId;
  const io = req.app.get('io');
 


  if (
    typeof data.message !== "string" ||
    typeof data.sender !== "string"
  ) {
    return res.status(412).send({
      success: false,
      message: "Validation failed: Missing fields",
    });
  }

  if (!schoolId) {
    return res.status(404).json({ message: 'School id not found' });
  }
  
  const newAnnouncement = {...data, id: uuidv4()};

  try {
      await SchoolModel.updateOne(
      { id: schoolId }, // Query to find the document
      { $push: { 'schoolAnnouncements': newAnnouncement } }
    );

    io.in(`schoolId_${schoolId}`).emit("notification", 'new school notification')

    res.status(200).json({
        success: true,
        message: 'Announcement uploaded successfully',
      })

  } catch (err) {
    console.error('Error updating announcement:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
 
});

