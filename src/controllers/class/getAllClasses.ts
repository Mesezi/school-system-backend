import asyncHandler from "express-async-handler";
import { ClassModel } from "../../models/classModel";


export const getAllClasses = asyncHandler(async (req:any, res:any) => {
  // Destructure the schoolId from req.userData
  const { schoolId } = req.userData;

  try {
    // Find all classes that match the provided schoolId
    const classes = await ClassModel.find({ schoolId }).select('-password -accountType -username -_id -__v');

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: 'No classes found' });
    }

    // Return the classes
    res.status(200).json({
        message: 'Success',
        data: classes
    });
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
