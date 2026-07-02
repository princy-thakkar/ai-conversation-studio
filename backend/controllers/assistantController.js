// Assistant controller
// Handles AI assistant CRUD operations

const Assistant = require('../models/Assistant');

// @desc    Get all assistants
// @route   GET /api/assistants
// @access  Private
exports.getAssistants = async (req, res) => {
  try {
    const assistants = await Assistant.find({ createdBy: req.user.id });

    res.json({
      success: true,
      count: assistants.length,
      data: { assistants },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single assistant
// @route   GET /api/assistants/:id
// @access  Private
exports.getAssistant = async (req, res) => {
  try {
    const assistant = await Assistant.findById(req.params.id);

    if (!assistant) {
      return res.status(404).json({
        success: false,
        message: 'Assistant not found',
      });
    }

    res.json({
      success: true,
      data: { assistant },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create assistant
// @route   POST /api/assistants
// @access  Private
exports.createAssistant = async (req, res) => {
  try {
    const assistant = await Assistant.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: { assistant },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update assistant
// @route   PUT /api/assistants/:id
// @access  Private
exports.updateAssistant = async (req, res) => {
  try {
    const assistant = await Assistant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!assistant) {
      return res.status(404).json({
        success: false,
        message: 'Assistant not found',
      });
    }

    res.json({
      success: true,
      data: { assistant },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete assistant
// @route   DELETE /api/assistants/:id
// @access  Private
exports.deleteAssistant = async (req, res) => {
  try {
    const assistant = await Assistant.findByIdAndDelete(req.params.id);

    if (!assistant) {
      return res.status(404).json({
        success: false,
        message: 'Assistant not found',
      });
    }

    res.json({
      success: true,
      message: 'Assistant deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
