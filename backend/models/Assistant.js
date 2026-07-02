const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssistantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Assistant name is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  model: {
    type: String,
    enum: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    default: 'gpt-4',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft',
  },
  systemPrompt: {
    type: String,
    default: '',
  },
  temperature: {
    type: Number,
    min: 0,
    max: 2,
    default: 0.7,
  },
  maxTokens: {
    type: Number,
    default: 2048,
  },
  knowledgeBase: [{
    type: Schema.Types.ObjectId,
    ref: 'Knowledge',
  }],
  prompts: [{
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
  }],
  analytics: {
    totalConversations: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    avgResponseTime: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Assistant', AssistantSchema);
