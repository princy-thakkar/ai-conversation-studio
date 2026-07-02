const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromptSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Prompt name is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Prompt content is required'],
  },
  category: {
    type: String,
    default: 'general',
  },
  version: {
    type: String,
    default: 'v1.0',
  },
  tokens: {
    type: Number,
    default: 0,
  },
  variables: [{
    name: String,
    type: String,
    default: String,
    required: Boolean,
  }],
  examples: [{
    input: String,
    output: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  performance: {
    avgResponseTime: Number,
    successRate: Number,
  },
  assistant: {
    type: Schema.Types.ObjectId,
    ref: 'Assistant',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

PromptSchema.index({ name: 'text', content: 'text' });

module.exports = mongoose.model('Prompt', PromptSchema);
