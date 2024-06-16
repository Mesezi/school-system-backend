import asyncHandler from "express-async-handler";
import { StudentModel } from '../../models/studentModel';

// Controller to update student details
export const updateStudentDetailsController = asyncHandler(async (req:any, res:any) => {
  const { studentId } = req.params;
  const newData = req.body;

    // Remove any fields that should not be updated
    delete newData?.password;
    delete newData?._id;
    delete newData?.createdAt;
    delete newData?.accountType;
    delete newData?.id;
    delete newData?.email;
    delete newData?.schoolId;

  try {
    // Ensure fields like password, _id, and schoolId are not overwritten
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { id: studentId },
      {
        ...newData,
      },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password -__v -_id');

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error:any) {
    console.error('Error updating student:', error);
    res.status(500).json({
        success: false,
        message: 'An error occurred while updating the student.',
        error: error.message || error,
      });
  }
});
