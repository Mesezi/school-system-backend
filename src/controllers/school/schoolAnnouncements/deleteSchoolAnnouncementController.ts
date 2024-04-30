import asyncHandler from "express-async-handler";
import SchoolModel from "../../../models/schoolModel";

export const deleteSchoolAnnouncement = asyncHandler(
  async (req: any, res: any) => {
    const { id } = req.params;
    const schoolId = req.userData.schoolId;

    if (!schoolId) {
      return res.status(404).json({ message: "School id not found" });
    }

    try {
      // Update the school document to remove the performance data
      const result: any = await SchoolModel.updateOne(
        { id: schoolId },
        { $pull: { schoolAnnouncements: { id } } }
      );
  
    res.status(200).json({
        success: true,
        message: 'Announcement deleted',
      }) 
      
    } catch (err) {
      console.error("Error updating announcement:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
