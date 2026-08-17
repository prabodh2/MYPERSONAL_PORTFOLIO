import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  iconName: String,
  items: [
    {
      name: { type: String, required: true },
      icon: String
    }
  ]
});

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
