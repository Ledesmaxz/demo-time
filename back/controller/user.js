const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/middleware'); 
const Usuario = require('../model/user');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await Usuario.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
