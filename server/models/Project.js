import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  description: {
    type: String,
    required: true
  },
  contributions: [String],
  tags: [String],
  isClone: {
    type: Boolean,
    default: false
  },
  cloneLabel: String,
  githubUrl: String,
  liveUrl: String,
  visualTheme: {
    type: String,
    enum: ['fintech', 'automotive', 'food', 'standard'],
    default: 'standard'
  },
  featured: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
