// Feedback controller
// Handles user feedback management

const Feedback = require('../models/Feedback');

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private
exports.getFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 20, rating, assistant } = req.query;

    const query = {};
    if (rating) query.rating = parseInt(rating);
    if (assistant) query.assistant = assistant;

    const feedback = await Feedback.find(query)
      .populate('user', 'firstName lastName email')
      .populate('assistant', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Feedback.countDocuments(query);

    res.json({
      success: true,
      data: {
        feedback,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
exports.submitFeedback = async (req, res) => {
  try {
    const { conversationId, rating, comment, categories } = req.body;

    const feedback = await Feedback.create({
      conversation: conversationId,
      user: req.user.id,
      assistant: req.body.assistantId,
      rating,
      comment,
      categories,
    });

    res.status(201).json({
      success: true,
      data: { feedback },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Respond to feedback
// @route   POST /api/feedback/:id/respond
// @access  Private
exports.respondToFeedback = async (req, res) => {
  try {
    const { content } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        response: {
          content,
          respondedBy: req.user.id,
          respondedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.json({
      success: true,
      data: { feedback },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Mark feedback as helpful
// @route   POST /api/feedback/:id/helpful
// @access  Private
exports.markHelpful = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { 'helpful.count': 1 },
        $push: { 'helpful.users': req.user.id },
      },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.json({
      success: true,
      data: { feedback },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
