const express = require('express');
const router = express.Router();
const { getDashboardAnalytics, getAssistantAnalytics, getFeedbackAnalytics, exportReport } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/dashboard', protect, getDashboardAnalytics);
router.get('/assistants/:id', protect, getAssistantAnalytics);
router.get('/feedback', protect, getFeedbackAnalytics);
router.get('/export', protect, exportReport);

module.exports = router;
