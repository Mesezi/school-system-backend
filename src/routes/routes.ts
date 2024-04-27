import { login } from "../controllers/auth/login";
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
const router = express.Router();

router.post("/register", registerSchoolOwner, register);
router.post("/login", loginValidation, login);
router.post("/school/schoolAnnouncement/add", addSchoolAnnouncement);
router.delete("/school/schoolAnnouncement/delete/:id", deleteSchoolAnnouncement);
router.post("/school/calendar", updateSchoolCalendar);
router.post("/school/information", updateSchoolInformation);
router.post("/school/subjects", updateSchoolSubjects);
router.post("/school/sessionAndTerm", updateSchoolSessionAndTerm);


export default router;
