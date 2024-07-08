import asyncHandler from "express-async-handler";
import { ClassModel } from "../../models/classModel";

export const deleteClassController = asyncHandler(async (req:any, res:any) => {
  
  try {
    const classId = req.params.id; // Assuming classId is passed as a parameter in the request URL

    // Your code to find and delete the class based on the classId goes here
    const deletedClass = await ClassModel.findOneAndDelete({ id: classId });

    if (!deletedClass) {
      return res.status(404).json({
        message: "Class not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Class successfully deleted",
      success: true,
      deletedClass: deletedClass,
    });
    
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});
