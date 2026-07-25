const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/users
// @desc    Get all greeted users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error: ' + error.message,
    });
  }
});

// @route   POST /api/users
// @desc    Add a new user greeting
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name',
      });
    }

    const newUser = await User.create({
      name: name.trim(),
      message: message ? message.trim() : 'Hello User!',
    });

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user entry by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User removed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error deleting user: ' + error.message,
    });
  }
});

module.exports = router;
