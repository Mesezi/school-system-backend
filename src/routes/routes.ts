import { login } from "../controllers/auth/login";
import { register } from "../controllers/auth/register";
import { updateSchoolDetails } from "../controllers/school/updateSchoolDetails";
import loginValidation from "../middleware/validation/loginValidation";
import registerSchoolOwner from "../middleware/validation/registerSchoolOwner";
import express from 'express';
const router = express.Router();

router.post("/register", registerSchoolOwner, register);
router.post("/login", loginValidation, login);
router.put("/updateSchoolDetails/:id", updateSchoolDetails);

export default router;
