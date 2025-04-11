import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contact: String,
  bedsAvailable: Number,
  emergencyCapacity: Number,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  specialties: [String],
  ambulancesAvailable: Number
});

hospitalSchema.index({ location: '2dsphere' });

export default mongoose.model('Hospital', hospitalSchema);