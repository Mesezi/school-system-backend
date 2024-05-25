import asyncHandler from "express-async-handler";
import { ClassModel } from "../../models/classModel";


export const getClassInformationController = asyncHandler(async (req:any, res:any) => {
  // Destructure the schoolId from req.userData
  const { schoolId } = req.userData;
  const { id } = req.params;

  if (!schoolId) {
    return res.status(404).json({ message: "School id not found" });
  }

  if (!id) {
    return res.status(404).json({ message: "Class id not found" });
  }

  try {
    // Find all classes that match the provided schoolId
    const classes = await ClassModel.find({ schoolId, id }).select('-password -accountType -username -_id -__v');

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Return the classes
    res.status(200).json({
        message: 'Success',
        data: {
            classInformation: classes[0],
            students: []
        } 
    });
  } catch (error) {
    console.error('Error finding class:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
