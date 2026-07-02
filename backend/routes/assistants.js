const express = require('express');
const router = express.Router();
const { getAssistants, getAssistant, createAssistant, updateAssistant, deleteAssistant } = require('../controllers/assistantController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getAssistants);
router.post('/', protect, authorize('admin', 'manager'), createAssistant);
router.get('/:id', protect, getAssistant);
router.put('/:id', protect, updateAssistant);
router.delete('/:id', protect, authorize('admin'), deleteAssistant);

module.exports = router;
