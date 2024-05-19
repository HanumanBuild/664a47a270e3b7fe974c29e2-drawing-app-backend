const express = require('express');
const Drawing = require('../models/Drawing');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { drawingData } = req.body;
  try {
    const newDrawing = new Drawing({ userId: req.user.id, drawingData });
    await newDrawing.save();
    res.status(201).send('Drawing saved');
  } catch (err) {
    res.status(500).send('Error saving drawing');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const drawings = await Drawing.find({ userId: req.user.id });
    res.json(drawings);
  } catch (err) {
    res.status(500).send('Error retrieving drawings');
  }
});

module.exports = router;