import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  period: { type: String, required: true },
  responsibilities: [String],
  tags: [String]
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
