import { Router } from 'express'
import { expressjwt as jwt} from "express-jwt";
import { imgUpload} from "./modules/multer.js";

import { createStudent, studentLogin, getAllStudent, getSingleStudent, updateStudent, deleteStudent} from "./handlers/student.js";
import { createStaff, getAllStaff, getSingleStaff, staffLogin, deleteStaff, updateStaff} from "./handlers/staff.js";
import { createAdmin, getAllAdmin, getSingleAdmin, adminLogin, updateAdmin, deleteAdmin} from "./handlers/admin.js";
import { registerProject } from "./handlers/project.js";

const router = Router()

router.get('/student', getAllStudent)
// get single student
router.get('/student/:id', getSingleStudent)
// student signup
router.post('/student', createStudent)
// student login
router.post('/student/login',studentLogin, jwt({secret: 'Sathyabama-Student', algorithms: ["HS256"],}))
// update student
router.put('/student/:id', updateStudent)
// delete student
router.delete('/student/:id', deleteStudent)


router.get('/staff', getAllStaff)
// get single staff
router.get('/staff/:id', getSingleStaff)
// staff signup
router.post('/staff', imgUpload.single("profileImg"), createStaff)
// staff login
router.post('/staff/login', staffLogin, jwt({secret: 'Sathyabama-Staff', algorithms: ["HS256"],}))
// to update staff   TODO: update
router.put('/staff/:id', updateStaff)
// staff delete TODO: delete

router.delete('/staff/:id', deleteStaff)


router.get('/admin', getAllAdmin)
router.get('/admin/:id', getSingleAdmin)
router.post('/admin', createAdmin)
router.post('/admin/login', adminLogin, jwt({secret: 'Sathyabama-Staff', algorithms: ["HS256"],}))
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)

// Projects
router.get('/projects')
router.get('/projects/:id')
router.post('/projects', registerProject)
router.put('/projects/:id')
router.delete('/projects/:id')

export default router