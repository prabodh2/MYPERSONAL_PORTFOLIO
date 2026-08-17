import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: String,
  period: { type: String, required: true },
  isPrimary: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Education || mongoose.model('Education', educationSchema);
