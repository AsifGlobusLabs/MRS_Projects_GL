// routes/assignmentRoutes.js
const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/', assignmentController.createAssignment);
router.get('/',auth, assignmentController.getAllAssignments);
router.get('/assignment-codes', assignmentController.getAssignmentCodes);
router.get('/latest-assignment-code', assignmentController.getLatestAssignmentCode);
router.get('/latest-assignment-employeeid', assignmentController.getLatestAssignmentEmployeeId);
router.get('/:employee_id', assignmentController.getAssignmentDetailsByEmployeeId);
router.patch('/:id', assignmentController.updateAssignment);
router.delete('/:id', assignmentController.deleteAssignment);
router.get('/status/progress',auth, assignmentController.getAssignmentStatus);
router.patch('/:code/progress', assignmentController.progressAssignmentStatus);
router.patch('/:code/complete', assignmentController.completeAssignmentStatus);
// router.get('/status', assignmentController.getAssignmentStatus);


module.exports = router;