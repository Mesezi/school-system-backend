import asyncHandler from "express-async-handler";
import XLSX from "xlsx";
import { ResultModel } from '../../models/resultModel'; // Import ResultModel
import { StudentModel } from '../../models/studentModel'; // Import StudentModel
import { validateSessionAndTerm } from "../../lib/utils";

// Controller for handling class bulk upload and converting XLSX to JSON
export const classResultBulkUpload = asyncHandler(async (req: any, res: any) => {
  const schoolId = req.userData.schoolId;
  const { file } = req;
  const { session, term } = req.body;
  const sessionAndTermValidation  = validateSessionAndTerm(session, term)
  
  if(sessionAndTermValidation){
    return res.status(404).json({ message: sessionAndTermValidation });
  }

  if (!schoolId) {
      return res.status(404).json({ message: "School id not found" });
  }

  if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
  }

  if (!session) {
      return res.status(400).json({ message: "No session found" });
  }

  try {
      // Use the buffer from the uploaded file
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const subjectsSet = new Set();

      // Validate and transform the data
      const transformedData: any = jsonData.reduce((acc: any, curr: any) => {
          const { Name, "Student ID": studentId, Subject, "Test 1": test1, "Test 2": test2, Exam } = curr;

          // Validate Test scores
          if (test1 !== "N/A" && isNaN(test1) && test1 !== "") {
              throw new Error(`Invalid score in Test 1 for ${Name}: ${test1}`);
          }
          if (test2 !== "N/A" && isNaN(test2) && test2 !== "") {
              throw new Error(`Invalid score in Test 2 for ${Name}: ${test2}`);
          }
          if (Exam !== "N/A" && isNaN(Exam) && Exam !== "") {
              throw new Error(`Invalid score in Exam for ${Name}: ${Exam}`);
          }

          // Add subject to the set for later validation
          subjectsSet.add(Subject);

          // Find or create student entry
          let studentEntry = acc.find((student: any) => student.name === Name);

          if (!studentEntry) {
              studentEntry = {
                  name: Name,
                  id: studentId,
                  subjects: []
              };
              acc.push(studentEntry);
          }

          // Add subject scores only if they are not "N/A"
          if (test1 !== "N/A" || test2 !== "N/A" || Exam !== "N/A") {
              studentEntry.subjects.push({
                  subject: Subject,
                  test1: test1 !== "N/A" ? test1 : undefined,
                  test2: test2 !== "N/A" ? test2 : undefined,
                  exam: Exam !== "N/A" ? Exam : undefined
              });
          }

          return acc;
      }, []);

      const missingStudentsErrors: string[] = []; // Array to hold error messages

      // Validate students' existence and school association
      for (const student of transformedData) {
          const { id } = student;

          // Check if the student exists in the database
          const studentRecord = await StudentModel.findOne({ id });

          if (!studentRecord) {
              missingStudentsErrors.push(`Student with ID ${id} not found`);
              continue; // Skip further checks for this student
          }

          // Check if the student belongs to the school
          if (studentRecord.schoolId !== schoolId) {
              missingStudentsErrors.push(`Student with ID ${id} does not belong to your school`);
              continue; // Skip further checks for this student
          }
      }

      // If there are any errors, respond with them and do not upload results
      if (missingStudentsErrors.length > 0) {
          return res.status(400).json({
              message: "Some students are not valid.",
              errors: missingStudentsErrors,
          });
      }

      // Handle results for each student
      for (const student of transformedData) {
          const { id, subjects } = student;
          const studentRecord = await StudentModel.findOne({ id });

          // Find or create the result document for the student
          let result = await ResultModel.findOne({ studentId: studentRecord?.id ?? '' }); // Assuming _id is the primary key

          if (!result) {
              // Create a new result document if it does not exist
              result = new ResultModel({ studentId: studentRecord?.id ?? '', session });
          }

          // Check if the session and term exist
          let sessionData: any = result.session.get(session);

          if (!sessionData) {
              // Create the session if it doesn't exist
              sessionData = result.session.set(session, { terms: new Map() });
          }

          let termData = sessionData.terms.get(term);

          if (!termData) {
              // Create the term if it doesn't exist
              termData = sessionData.terms.set(term, { results: [] });
          }

          // Update the results for each subject
          subjects.forEach((subject: any) => {
              termData.results.push(subject);
          });

          // Save the updated result document
          await result.save();
      }

      // Successfully processed the XLSX file
      res.status(200).json({
          message: "XLSX file processed and results updated successfully",
          data: transformedData,
      });

  } catch (err: any) {
      res.status(500).json({ message: err.message });
  }
});

