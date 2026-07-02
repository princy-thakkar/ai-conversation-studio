const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  assistant: {
    type: Schema.Types.ObjectId,
    ref: 'Assistant',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      tokens: Number,
      model: String,
    },
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'escalated', 'abandoned'],
    default: 'active',
  },
  duration: {
    type: Number, // in seconds
    default: 0,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  escalationReason: String,
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: Date,
  },
  metadata: {
    source: String,
    userAgent: String,
    ipAddress: String,
  },
}, {
  timestamps: true,
});

ConversationSchema.index({ assistant: 1, createdAt: -1 });
ConversationSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Conversation', ConversationSchema);
