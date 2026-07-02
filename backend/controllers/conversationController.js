// Conversation controller
// Handles conversation management and testing

const Conversation = require('../models/Conversation');
const grok = require('../config/groq');

// @desc    Get all conversations
// @route   GET /api/conversations
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const { page = 1, limit = 20, assistant, status } = req.query;

    const query = {};

    if (assistant) query.assistant = assistant;
    if (status) query.status = status;

    const conversations = await Conversation.find(query)
      .populate('assistant', 'name model')
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Conversation.countDocuments(query);

    res.json({
      success: true,
      data: {
        conversations,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single conversation
// @route   GET /api/conversations/:id
// @access  Private
exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('assistant', 'name model systemPrompt')
      .populate('user', 'firstName lastName email');

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found',
      });
    }

    res.json({
      success: true,
      data: {
        conversation,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Test conversation with Groq AI
// @route   POST /api/conversations/test
// @access  Private
exports.testConversation = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    const completion = await grok.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a professional AI assistant for AI Conversation Studio. Answer clearly and helpfully."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      success: true,
      data: {
        response: aiResponse,
        metadata: {
          model: completion.model,
          tokens: completion.usage?.total_tokens || 0,
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
        },
      },
    });

  } catch (error) {
    console.error("Groq Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to get AI response",
    });
  }
};

// @desc    Update conversation status
// @route   PATCH /api/conversations/:id/status
// @access  Private
exports.updateStatus = async (req, res) => {
  try {
    const { status, escalateReason } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      {
        status,
        escalateReason,
      },
      {
        new: true,
      }
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found',
      });
    }

    res.json({
      success: true,
      data: {
        conversation,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};