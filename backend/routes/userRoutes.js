import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// Get available medical professionals
router.get('/available', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 5000 } = req.query;
    
    const professionals = await User.find({
      role: 'medical_professional',
      available: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.json(professionals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;