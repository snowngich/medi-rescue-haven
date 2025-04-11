import express from 'express';
import Hospital from '../models/hospitalModel.js';

const router = express.Router();

// Get hospitals within radius
router.get('/nearby', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 5000 } = req.query;
    
    const hospitals = await Hospital.find({
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

    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update hospital capacity
router.patch('/:id/capacity', async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { $inc: { bedsAvailable: req.body.change } },
      { new: true }
    );
    res.json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;