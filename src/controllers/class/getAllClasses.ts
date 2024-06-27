import asyncHandler from "express-async-handler";
import { ClassModel } from "../../models/classModel";

export const getAllClasses = asyncHandler(async (req: any, res: any) => {
  // Destructure the schoolId from req.userData
  const { schoolId } = req.userData;
  const { type } = req.query;
  const classTypes = ["primary", "junior-secondary", "senior-secondary"];

  // Create a query object
  const query: any = { schoolId };

  // Validate and add classType to the query object if it exists
  if (type) {
    if (classTypes.includes(type)) {
      query.type = type;
    } else {
      return res.status(412).json({
        message:
          "Invalid class type provided. Valid types are: primary, junior-secondary, senior-secondary",
      });
    }
  }

  try {
    // Find all classes that match the provided schoolId
    const classes = await ClassModel.find(query).select(
      "-password -accountType -username -_id -__v"
    );

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }

    // Return the classes
    res.status(200).json({
      message: "Success",
      data: classes,
    });
  } catch (error) {
    console.error("Error finding classes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
