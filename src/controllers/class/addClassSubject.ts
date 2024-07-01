import asyncHandler from "express-async-handler";
import { ClassModel } from "../../models/classModel";
import { v4 as uuidv4 } from "uuid";


export const addSubjectController = asyncHandler(async (req: any, res: any) => {
    const { classId } = req.params;
    const { name, subjectDescription, schemeOfWork } = req.body;
    const schoolId = req.userData.schoolId;

    // console.log(schemeOfWork)

    if (!schoolId) {
        return res.status(404).json({ message: "School id not found" });
      }
  
    if (!name) {
      return res.status(400).json({ message: 'Subject name is required' });
    }
  
    try {
      const classDocument = await ClassModel.findOne({ id: classId });
  
      if (!classDocument) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      // Check if subject already exists
      const existingSubject = classDocument.subjects.find(subject => subject.name.toLowerCase() === name.toLowerCase());
      if (existingSubject) {
        return res.status(400).json({ message: 'Subject already exists' });
      }

      const subjectId = uuidv4();
  
      // Add the new subject
      classDocument.subjects.push({ name, subjectDescription, schemeOfWork, id: subjectId });
      await classDocument.save();
  
      res.status(201).json({
        message: 'Subject added successfully',
        subjects: classDocument.subjects,
      });
    } catch (error:any) {
      console.error('Error adding subject:', error);
      res.status(500).json({ message: error.message || error });
    }
  });
