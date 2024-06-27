import asyncHandler from "express-async-handler";
import { ClassModel } from "../../models/classModel";

export const deleteSubjectController = asyncHandler(async (req: any, res: any) => {
    const { classId, subjectId } = req.params;
    const schoolId = req.userData.schoolId;

    if (!schoolId) {
        return res.status(404).json({ message: "School id not found" });
    }

    try {
        const classDocument = await ClassModel.findOne({ id: classId });

        if (!classDocument) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const subjectIndex = classDocument.subjects.findIndex(subject => subject.id === subjectId);
        
        if (subjectIndex === -1) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // Remove the subject from the subjects array
        classDocument.subjects.splice(subjectIndex, 1);

        await classDocument.save();

        res.status(200).json({
            message: 'Subject deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting subject:', error);
        res.status(500).json({ message: error.message || error });
    }
});
