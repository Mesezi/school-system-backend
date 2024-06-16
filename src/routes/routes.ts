import { loginUserAccount } from "../controllers/auth/loginUserAccount";
import { register } from "../controllers/auth/register";
import loginValidation from "../middleware/validation/loginValidation";
import registerSchoolOwner from "../middleware/validation/registerSchoolOwner";
import express from 'express';
import { addSchoolAnnouncement } from "../controllers/school/schoolAnnouncements/addSchoolAnnouncementController";
import { deleteSchoolAnnouncement } from "../controllers/school/schoolAnnouncements/deleteSchoolAnnouncementController";
import { updateSchoolCalendar } from "../controllers/school/updateSchoolCalendar";
import { updateSchoolInformation } from "../controllers/school/updateSchoolInformationController";
import { updateSchoolSubjects } from "../controllers/school/updateSchoolSubjectsController";
import { updateSchoolSessionAndTerm } from "../controllers/school/updateSchoolSessionAndTermController";
import authMiddleware from "../middleware/validation/authMiddleware";
import { loginSchoolAccount } from "../controllers/auth/loginSchoolAccount";
import { createClassController } from "../controllers/class/createClassController";
import { deleteClassController } from "../controllers/class/deleteClassController";
import { getSchoolDetails } from "../controllers/school/getSchoolDetails";
import { getAllClasses } from "../controllers/class/getAllClasses";
import { getClassInformationController } from "../controllers/class/getClassInformationController";
import { addStudentController } from "../controllers/student/addStudentController";
import { updateClassSubjects } from "../controllers/class/updateClassSubjectsController";
import { updateClassTimetable } from "../controllers/class/updateClassTimetableController";
import { getStudentDetailsController } from "../controllers/student/getStudentDetailsController";
import { updateStudentDetailsController } from "../controllers/student/updateStudentDetailsController";
import { createStudentResult } from "../controllers/result/createStudentResult";
import { updateStudentTermResult } from "../controllers/result/updateStudentTermResult";
const router = express.Router();

router.post("/register", registerSchoolOwner, register);
router.post("/user/login", (req, res, next)=>loginValidation(req,res,next, 'user'), loginUserAccount);
router.post("/school/login",  (req, res, next)=>loginValidation(req,res,next, 'school'), loginSchoolAccount);


router.get("/class/all", authMiddleware, getAllClasses);
router.post("/class/create", authMiddleware, createClassController);
router.delete("/class/delete/:id", authMiddleware, deleteClassController);
router.get("/class/:id", authMiddleware, getClassInformationController);
router.post("/class/update-subjects/:classId", authMiddleware, updateClassSubjects);
router.post("/class/update-timetable/:classId", authMiddleware, updateClassTimetable);

router.get("/school/details", authMiddleware, getSchoolDetails);
router.post("/school/schoolAnnouncement/add", authMiddleware, addSchoolAnnouncement);
router.delete("/school/schoolAnnouncement/delete/:id", authMiddleware, deleteSchoolAnnouncement);
router.post("/school/calendar",authMiddleware, updateSchoolCalendar);
router.post("/school/information",authMiddleware, updateSchoolInformation);
router.post("/school/subjects",authMiddleware, updateSchoolSubjects);
router.post("/school/sessionAndTerm",authMiddleware, updateSchoolSessionAndTerm);


router.post("/student/add", authMiddleware, addStudentController);
router.get("/student/:studentId", authMiddleware, getStudentDetailsController);
router.post("/student/result/create/:studentId", authMiddleware, createStudentResult);
router.put("/student/result/update/:studentId", authMiddleware, updateStudentTermResult);
router.delete("/student/result/delete/:studentId", authMiddleware, getStudentDetailsController);
router.delete("/student/delete/:studentId", authMiddleware, getStudentDetailsController);
router.put("/student/update/:studentId", authMiddleware, updateStudentDetailsController);

export default router;
