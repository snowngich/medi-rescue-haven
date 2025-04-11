import express from 'express';
import Emergency from '../models/emergencyModel.js';
import Hospital from '../models/hospitalModel.js';

const router = express.Router();

// Create emergency
router.post('/', async (req, res) => {
  try {
    const emergency = new Emergency(req.body);
    await emergency.save();
    
    // Find nearest hospitals
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: emergency.location.coordinates
          },
          $maxDistance: 5000 // 5km radius
        }
      }
    });
    
    // Add emergency alert logic here
    
    res.status(201).json(emergency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get emergency status
router.get('/:id', async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id)
      .populate('medicalProfessional')
      .populate('hospital');
    res.json(emergency);
  } catch (error) {
    res.status(404).json({ message: 'Emergency not found' });
  }
});

export default router;