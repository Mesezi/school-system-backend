import asyncHandler from "express-async-handler";
import { StudentModel } from "../../models/studentModel";

export const deleteStudentController = asyncHandler(async (req:any, res:any) => {
  const { studentId } = req.params;

  try {
    // Find the student by their ID and delete them
    const student = await StudentModel.findOneAndDelete({ id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student deleted successfully',
      data: student
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
