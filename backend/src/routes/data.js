const express = require('express');
const router = express.Router();
const Data = require('../models/organizationModel');

let addCount = 0;
let updateCount = 0;

// Add new data
router.post('/add', async (req, res) => {
  try {
    await Data.deleteMany({});
    const newData = new Data(req.body);
    await newData.save();
    addCount++;
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update data
router.put('/update', async (req, res) => {
  try {
    const data = await Data.findById(req.body.id);
    if (!data) return res.status(404).json({ message: 'Data not found' });
    data.key = req.body.key || data.key;
    data.value = req.body.value || data.value;
    await data.save();
    updateCount++;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get count
router.get('/count', (req, res) => {
  res.status(200).json({ addCount, updateCount });
});

module.exports = router;
