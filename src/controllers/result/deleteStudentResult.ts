import asyncHandler from "express-async-handler";
import { ResultModel } from "../../models/resultModel";

export const deleteStudentResult = asyncHandler(async (req:any, res:any) => {
  const { studentId } = req.params;

  try {
    // Find the student by their ID and delete them
    const student = await ResultModel.findOneAndDelete({ id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Result deleted successfully',
      data: student
    });
  } catch (error) {
    console.error('Error deleting student result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
