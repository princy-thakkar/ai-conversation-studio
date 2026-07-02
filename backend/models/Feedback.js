const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assistant: {
    type: Schema.Types.ObjectId,
    ref: 'Assistant',
    required: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
  categories: {
    helpful: Boolean,
    accurate: Boolean,
    fast: Boolean,
    friendly: Boolean,
  },
  helpful: {
    count: { type: Number, default: 0 },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  response: {
    content: String,
    respondedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    respondedAt: Date,
  },
  metadata: {
    source: String,
    sentiment: String,
  },
}, {
  timestamps: true,
});

FeedbackSchema.index({ assistant: 1, createdAt: -1 });
FeedbackSchema.index({ rating: 1 });

module.exports = mongoose.model('Feedback', FeedbackSchema);
