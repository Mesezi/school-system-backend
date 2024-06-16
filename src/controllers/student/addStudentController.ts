import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';
import { StudentModel } from '../../models/studentModel';

export const addStudentController = asyncHandler(async (req:any, res:any) => {
  const data = req.body;
  const schoolId = req.userData.schoolId;

  try {
    const verifyEmail = await StudentModel.findOne({ email: data.email });
    if (verifyEmail) {
      return res.status(403).json({ message: 'Email already used' });
    }

    const studentId = uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const studentDetails = new StudentModel({
      ...data,
      id: studentId,
      accountType: 'student',
      classId: '',
      password: hashedPassword,
      schoolId,
    });

    const studentDetailsRes = await studentDetails.save();

    if (studentDetailsRes) {
      return res.status(201).json({
        message: 'Student successfully created!',
        result: studentDetails,
        success: true,
      });
    }
  } catch (err:any) {
    console.error('Error creating student:', err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the student.',
      error: err.message || err,
    });
  }
});
