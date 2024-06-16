import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { StudentModel } from '../../models/studentModel';


export const getStudentDetailsController = asyncHandler(async (req:any, res:any) => {
  const {studentId} = req.params;

  try {
    // Update the school document by its ID
    const student = await StudentModel.findOne({ id:studentId }).select('-password -__v -_id');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
        message: 'Success',
        data:student
    });
    
  } catch (error) {
    console.error('Error finding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



