import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema({
  patientName: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  status: { type: String, default: 'pending' },
  medicalProfessional: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  createdAt: { type: Date, default: Date.now }
});

emergencySchema.index({ location: '2dsphere' });

export default mongoose.model('Emergency', emergencySchema);