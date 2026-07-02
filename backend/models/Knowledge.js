const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KnowledgeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  type: {
    type: String,
    enum: ['document', 'faq', 'policy', 'api-doc', 'custom'],
    default: 'document',
  },
  category: {
    type: String,
    default: 'general',
  },
  tags: [{
    type: String,
    lowercase: true,
  }],
  parentFolder: {
    type: Schema.Types.ObjectId,
    ref: 'Knowledge',
    default: null,
  },
  isFolder: {
    type: Boolean,
    default: false,
  },
  fileSize: Number,
  mimeType: String,
  embedding: {
    type: [Number],
    default: null,
  },
  metadata: {
    author: String,
    version: String,
    lastUpdatedBy: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

KnowledgeSchema.index({ title: 'text', content: 'text' });
KnowledgeSchema.index({ tags: 1 });

module.exports = mongoose.model('Knowledge', KnowledgeSchema);
