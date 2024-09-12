import { loginSuperAdmin } from "../controllers/auth/loginSuperAdmin";
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
import { createClassController } from "../controllers/class/createClassController";
import { deleteClassController } from "../controllers/class/deleteClassController";
import { getSchoolDetails } from "../controllers/school/getSchoolDetails";
import { getClassInformationController } from "../controllers/class/getClassInformationController";
import { addStudentController } from "../controllers/student/addStudentController";
import { updateClassTimetable } from "../controllers/class/updateClassTimetableController";
import { getStudentDetailsController } from "../controllers/student/getStudentDetailsController";
import { updateStudentDetailsController } from "../controllers/student/updateStudentDetailsController";
import { createStudentResult } from "../controllers/result/createStudentResult";
import { updateStudentTermResult } from "../controllers/result/updateStudentTermResult";
import { addSubjectController } from "../controllers/class/addClassSubject";
import { updateSubjectController } from "../controllers/class/updateSubjectController";
import { deleteSubjectController } from "../controllers/class/deleteSubjectController";
import { getAllClasses } from "../controllers/class/getAllClasses";
import { getAllStudents } from "../controllers/student/getAllStudents";
import { updateSchoolGrade } from "../controllers/school/updateSchoolGrade";
import { updateSchoolPerformance } from "../controllers/school/updateSchoolPerformance";
import { updateSchoolScores } from "../controllers/school/updateSchoolScores";
import { loginAdmin } from "../controllers/auth/loginAdmin";
import { loginStudent } from "../controllers/auth/loginStudent";
import { createAdmin } from "../controllers/auth/createAdmin";
import { deleteAdmin } from "../controllers/auth/deleteAdmin";
import { deleteStudentController } from "../controllers/student/deleteStudentController";
import { deleteStudentResult } from "../controllers/result/deleteStudentResult";
import { loginClass } from "../controllers/auth/loginClass";
import { getStudentResult } from "../controllers/result/getStudentResult";



const router = express.Router();

router.post("/register", registerSchoolOwner, register);
router.post("/superAdmin/login", (req, res, next)=>loginValidation(req,res,next, 'email'), loginSuperAdmin);
router.post("/admin/login", (req, res, next)=>loginValidation(req,res,next, 'username'), loginAdmin);
router.post("/class/login", (req, res, next)=>loginValidation(req,res,next, 'username'), loginClass);
router.post("/student/login",  (req, res, next)=>loginValidation(req,res,next, 'email'), loginStudent);

router.post("/admin/create", authMiddleware, createAdmin);
router.delete("/admin/delete/:adminId", authMiddleware, deleteAdmin);

router.get("/class/all", authMiddleware, getAllClasses);
router.post("/class/create", authMiddleware, createClassController);
router.delete("/class/delete/:id", authMiddleware, deleteClassController);
router.get("/class/:id", authMiddleware, getClassInformationController);
router.post("/class/update-timetable/:classId", authMiddleware, updateClassTimetable);
router.post("/class/subjects/add/:classId", authMiddleware, addSubjectController);
router.put("/class/subjects/update/:classId/:subjectId", authMiddleware, updateSubjectController);
router.delete("/class/subjects/delete/:classId/:subjectId", authMiddleware, deleteSubjectController);

router.get("/school/details", authMiddleware, getSchoolDetails);
router.post("/school/schoolAnnouncement/add", authMiddleware, addSchoolAnnouncement);
router.delete("/school/schoolAnnouncement/delete/:id", authMiddleware, deleteSchoolAnnouncement);
router.post("/school/calendar",authMiddleware, updateSchoolCalendar);
router.post("/school/information",authMiddleware, updateSchoolInformation);
router.post("/school/subjects",authMiddleware, updateSchoolSubjects);
router.post("/school/sessionAndTerm",authMiddleware, updateSchoolSessionAndTerm);
router.post("/school/grade",authMiddleware, updateSchoolGrade);
router.post("/school/performance",authMiddleware, updateSchoolPerformance);
router.post("/school/scores",authMiddleware, updateSchoolScores);


router.post("/student/add", authMiddleware, addStudentController);
router.get("/student/all", authMiddleware, getAllStudents);
router.get("/student/:studentId", authMiddleware, getStudentDetailsController);
router.post("/student/result/create/:studentId", authMiddleware, createStudentResult);
router.get("/student/result", authMiddleware, getStudentResult);
router.put("/student/result/update/:studentId", authMiddleware, updateStudentTermResult);
router.delete("/student/result/delete/:studentId", authMiddleware, deleteStudentResult);
router.delete("/student/delete/:studentId", authMiddleware, deleteStudentController);
router.put("/student/update/:studentId", authMiddleware, updateStudentDetailsController);

export default router;
