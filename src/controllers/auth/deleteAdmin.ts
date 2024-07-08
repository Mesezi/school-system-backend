import asyncHandler from "express-async-handler";
import { AdminModel } from "../../models/adminModel";

export const deleteAdmin = asyncHandler(async (req:any, res:any) => {
  const { adminId } = req.params;
  const { schoolId } = req.userData; 

  if (!schoolId) {
    return res.status(404).json({ message: "School ID not found" });
  }
console.log(schoolId, adminId)
  try {
    
    const admin = await AdminModel.findOneAndDelete({ id: adminId, schoolId });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
