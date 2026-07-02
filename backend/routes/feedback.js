const express = require('express');
const router = express.Router();
const { getFeedback, submitFeedback, respondToFeedback, markHelpful } = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getFeedback);
router.post('/', protect, submitFeedback);
router.post('/:id/respond', protect, respondToFeedback);
router.post('/:id/helpful', protect, markHelpful);

module.exports = router;
