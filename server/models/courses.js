import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Course', courseSchema);
