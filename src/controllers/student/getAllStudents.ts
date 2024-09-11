import express from 'express';
import { StudentModel } from '../../models/studentModel'; // Adjust the path to your student model
import asyncHandler from 'express-async-handler';

// GET endpoint to retrieve students based on schoolId and other query parameters
export const getAllStudents = asyncHandler(async (req: any, res: any) => {
  const { schoolId } = req.userData; // Assuming schoolId is in req.userData
  const { name, classId, sex, page = 1, limit = 10 } = req.query;

  if (!schoolId) {
    return res.status(404).json({ message: "School ID not found" });
  }

  try {
    // Create a query object
    const query: any = { schoolId };

    // Add name filter if provided
    if (name) {
      query.name = new RegExp(name, 'i'); // Case-insensitive regex search
    }

    if (classId) {
      query.classId = classId;
    }

    // Add gender filter if provided
    if (sex) {
      query.sex = sex;
    }

    // Convert page and limit to integers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Find students based on query with pagination
    const students = await StudentModel.find(query)
      .select('-password -accountType -username -_id -__v')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    if (!students || students.length === 0) {
      return res.status(200).json({ message: 'No students found', data: [] });
    }

const totalStudents = await StudentModel.countDocuments(query)

    // Return the students
    res.status(200).json({
      message: 'Success',
      data: students,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalStudents
      }
    });
  } catch (error) {
    console.error('Error finding students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

