import { ResultModel } from '../../models/resultModel';
import { StudentModel } from '../../models/studentModel';
import asyncHandler from "express-async-handler";


export const getStudentResult = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
  const schoolId = req.userData.schoolId;
  const {session, term, studentId} = req.params

  const student = await StudentModel.findOne({ id:studentId }).select('-password -__v -_id');

  try {
    if (!studentId) {
        return res.status(400).send('Student ID is required');
      }
  
      const result = await ResultModel.findOne({ id: studentId });
  
      if (!result) {
        return res.status(404).send('Student result not found');
      }
  
      const sessionData = result.session.get(session);
  
      if (!sessionData) {
        return res.status(404).send('Session not found');
      }
  
      const termData = sessionData.terms.get(term);

      if (!termData) {
        return res.status(404).send('Term not found');
      }
  
      res.status(200).json({
        message: 'Success',
        data: termData.results
    });

    } catch (err:any) {
      res.status(500).send(err.message);
    }
});