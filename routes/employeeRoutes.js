const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleware/authmiddleware');
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

router.get('/', protect, admin, getEmployees);
router.post('/', protect, admin, createEmployee);
router.put('/:id', protect, admin, updateEmployee);
router.delete('/:id', protect, admin, deleteEmployee);

module.exports = router;