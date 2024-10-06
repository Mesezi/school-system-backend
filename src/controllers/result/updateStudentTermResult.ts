import { ResultModel } from '../../models/resultModel';
import asyncHandler from "express-async-handler";
import { StudentModel } from '../../models/studentModel';
import SchoolModel from '../../models/schoolModel';
import { ClassModel } from '../../models/classModel';
import { validateSessionAndTerm } from '../../lib/utils';

// Controller for creating a result
export const updateStudentTermResult = asyncHandler(async (req:any, res:any) => {
  const schoolId = req.userData.schoolId;
  const {session, term, results } = req.body;
  const {studentId} = req.params

  const sessionAndTermValidation  = validateSessionAndTerm(session, term)
  
  if(sessionAndTermValidation){
    return res.status(404).json({ message: sessionAndTermValidation });
  }

  if (!schoolId) {
    return res.status(404).json({ message: "School id not found" });
  }


  try {
    const student = await StudentModel.findOne({ id:studentId })

    // Check if the student is assigned to a class
    if (student?.classId === '') {
        return res.status(400).json({ message: 'This student does not belong to a class' });
      }
  
      // Find the result document for the student
      let result = await ResultModel.findOne({ id: studentId });
  
      if (!result) {
        return res.status(404).json({ message: 'Result document not found for the student' });
      }
  
      // Access the session data and term data
      const sessionData = result.session.get(session);
  
      if (!sessionData) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      const termData = sessionData.terms.get(term);
  
      if (!termData) {
        return res.status(404).json({ message: 'Term not found in session' });
      }
  
      // Update the results array in the specified term
      termData.results = results;
  
      // Save the updated result document
      await result.save();
  
      res.status(200).json({
        message: 'Results updated successfully',
        result: result
      });

    } catch (err:any) {
      res.status(500).send(err.message || err);
    }
});
