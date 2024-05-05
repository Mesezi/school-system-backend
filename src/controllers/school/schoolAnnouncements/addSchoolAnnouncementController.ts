import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import SchoolModel from "../../../models/schoolModel";

export const addSchoolAnnouncement = asyncHandler(async (req: any, res: any) => {
  const data = req.body;
  const schoolId = req.userData.schoolId;
  const io = req.app.get('io');

  if (
    typeof data.message !== "string" || !data.message.trim() ||
    typeof data.sender !== "string" || !data.sender.trim()
  ) {
    return res.status(412).send({
      success: false,
      message: "Missing or empty fields",
    });
  }

  if (!schoolId) {
    return res.status(404).json({ message: 'School id not found' });
  }

  const newAnnouncement = { ...data, id: uuidv4() };

  try {
    const school = await SchoolModel.findOne({ id: schoolId });

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Check if the number of announcements exceeds 10
    if (school.schoolAnnouncements.length >= 10) {
      // Delete the oldest announcement
      await SchoolModel.updateOne(
        { id: schoolId },
        { $pop: { 'schoolAnnouncements': -1 } } // Remove the first element
      );
    }

    // Add the new announcement
    await SchoolModel.updateOne(
      { id: schoolId },
      { $push: { 'schoolAnnouncements': newAnnouncement } }
    );

    io.in(`schoolId_${schoolId}`).emit("notification", 'new school notification');

    res.status(200).json({
      success: true,
      message: 'Announcement uploaded successfully',
    });

  } catch (err) {
    console.error('Error updating announcement:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
