import SchoolModel from '../../models/schoolModel';
import asyncHandler from "express-async-handler";


export const getSchoolDetails = asyncHandler(async (req:any, res:any) => {
  //Destructuing the inputs from req.body
  const updateData = req.body;
  const schoolId = req.userData.schoolId;

  try {
    // Update the school document by its ID
    const school = await SchoolModel.findOne({ id:schoolId });

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }


    res.status(200).json({
        message: 'Success',
        data:school
    });
    
  } catch (error) {
    console.error('Error finding school:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



