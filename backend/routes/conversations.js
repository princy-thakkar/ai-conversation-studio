const express = require('express');
const router = express.Router();
const { getConversations, getConversation, testConversation, updateStatus } = require('../controllers/conversationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getConversations);
router.post('/test', protect, testConversation);
router.get('/:id', protect, getConversation);
router.patch('/:id/status', protect, updateStatus);

module.exports = router;
