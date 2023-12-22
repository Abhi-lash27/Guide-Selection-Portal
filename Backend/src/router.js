import { Router } from "express";

import { imgUpload } from "./modules/multer.js";

import {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} from "./handlers/student.js";
import {
  createStaff,
  getAllStaff,
  getSingleStaff,
  deleteStaff,
  updateStaff,
} from "./handlers/staff.js";
import {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} from "./handlers/admin.js";
import {
  registerProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
} from "./handlers/project.js";

const router = Router();

router.get("/student", getAllStudent);
// get single student
router.get("/student/:id", getSingleStudent);
// student signup
// router.post("/student", createStudent);
// update student
router.put("/student/:id", updateStudent);
// delete student
router.delete("/student/:id", deleteStudent);

router.get("/staff", getAllStaff);
router.get("/staff/:id", getSingleStaff);
router.post("/staff", imgUpload.single("profileImg"), createStaff);
router.put("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);

router.get("/admin", getAllAdmin);
router.get("/admin/:id", getSingleAdmin);
router.post("/admin", createAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

// Projects
router.get("/projects", getAllProjects);
router.get("/projects/:id", getSingleProject);
router.post("/projects", registerProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

export default router;
