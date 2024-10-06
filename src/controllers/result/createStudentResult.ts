import { ResultModel } from "../../models/resultModel";
import asyncHandler from "express-async-handler";
import { StudentModel } from "../../models/studentModel";
import SchoolModel from "../../models/schoolModel";
import { ClassModel } from "../../models/classModel";
import { validateSessionAndTerm } from "../../lib/utils";

// Controller for creating a result
export const createStudentResult = asyncHandler(async (req: any, res: any) => {
  const schoolId = req.userData.schoolId;
  const { session, term, comments, results } = req.body;
  const { studentId } = req.params;
  const sessionAndTermValidation  = validateSessionAndTerm(session, term)
  
  if(sessionAndTermValidation){
    return res.status(404).json({ message: sessionAndTermValidation });
  }

  if (!schoolId) {
    return res.status(404).json({ message: "School id not found" });
  }

  try {
    const student = await StudentModel.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({
        message: "This student does not exist",
      });
    }

    if (student?.classId === "") {
      return res.status(400).json({
        message: "This student does not belong to a class",
      });
    }

    let result = await ResultModel.findOne({ id: studentId });

    if (result?.session?.has(session)) {
      const sessionData = result.session.get(session);

      // Check if the term already exists within the session
      if (sessionData?.terms?.has(term)) {
        return res.status(400).json({
          message: `Term '${term}' already exists in session '${session}'`,
        });
      }
    }

    if (!result) {
      result = new ResultModel({ id: studentId, session: {} });
    }

    if (!result.session.has(session)) {
      result.session.set(session, {
        terms: new Map(),
      });
    }

    const sessionData = result.session.get(session);

    if (sessionData) {
      const school = await SchoolModel.findOne({ id: schoolId });
      const classInfo = await ClassModel.findOne({
        schoolId,
        id: student.classId,
      });

      if (!school?.schoolName || !classInfo?.name) {
        return res
          .status(500)
          .json({ message: "School or class information not found" });
      }

      sessionData.terms.set(term, {
        comments,
        info: "",
        verified: false,
        class: classInfo.name,
        schoolId,
        school: school?.schoolName ?? "",
        results,
      });
    }

    await result.save();
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).send(err.message || err);
  }
});
