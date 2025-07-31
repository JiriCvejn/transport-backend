const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role });
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Neexistující uživatel' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Špatné heslo' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
