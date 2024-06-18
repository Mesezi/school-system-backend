import asyncHandler from "express-async-handler";
import { ClassModel } from "../../models/classModel";

export const updateSubjectController = asyncHandler(async (req: any, res: any) => {
    const { classId, subjectId } = req.params;
    const { description, schemeOfWork } = req.body;
    const schoolId = req.userData.schoolId;
    
    if (!schoolId) {
        return res.status(404).json({ message: "School id not found" });
    }

    try {
        const classDocument = await ClassModel.findOne({ id: classId });
      
        if (!classDocument) {
            return res.status(404).json({ message: 'Class not found' });
        }


        const subject = classDocument.subjects.find(subject => subject.id === subjectId);

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

          // Check for duplicate weeks in the schemeOfWork array
          if (schemeOfWork && Array.isArray(schemeOfWork)) {
            const weeks = schemeOfWork.map(entry => entry.week);
            const uniqueWeeks = new Set(weeks);
            if (uniqueWeeks.size !== weeks.length) {
                return res.status(400).json({ message: 'Duplicate week values are not allowed in scheme of work.' });
            }
        }

        // Update the description and schemeOfWork if provided
        if (description !== undefined) {
            subject.description = description;
        }
        if (schemeOfWork !== undefined) {
            subject.schemeOfWork = schemeOfWork;
        }

        res.status(200).json({
            message: 'Subject updated successfully',
            data: subject,
        });
    } catch (error: any) {
        console.error('Error updating subject:', error);
        res.status(500).json({ message: error.message || error });
    }
});
