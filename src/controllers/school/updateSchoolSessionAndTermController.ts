import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { isValidDateString } from "../../util/isValidDateString";


export const updateSchoolSessionAndTerm = asyncHandler(async (req:any, res:any) => {

const updateData = req.body;
const schoolId = req.userData.schoolId;

if (!schoolId) {
  return res.status(404).json({ message: "School id not found" });
}

const schema = { session: String, term: String, termEndDate: Date };
// Check if all three keys are present in updateData
const requiredKeys = Object.keys(schema);
const actualKeys = Object.keys(updateData);
if (!requiredKeys.every(key => actualKeys.includes(key))) {
  return res.status(400).json({
    success: false,
    message: 'Missing fields: session, term, termEndDate'
  });
}

// Validate types of individual keys
for (const key in updateData) {
  const value = updateData[key];
  if (key === 'termEndDate') {
    // Check if termEndDate is a valid date string
    if (!isValidDateString(value)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format for termEndDate'
      });
    }
  } else if (
    (key === 'session' || key === 'term') && typeof value !== 'string'
  ) {
    return res.status(400).json({
      success: false,
      message: `Field ${key} in school session and term is invalid`
    });
  }
}


try {
  // Update the school document by its ID
  const updatedSchool = await SchoolModel.findOneAndUpdate({ id: schoolId }, {schoolSessionAndTerm: updateData}, { new: true });

  if (!updatedSchool) {
    return res.status(404).json({ message: 'School not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Updated school session and term',
  });
} catch (error) {
  console.error('Error updating school:', error);
  res.status(500).json({ message: 'Internal server error' });
}
});
