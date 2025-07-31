const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth(), async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.post('/', auth('operator'), async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

router.put('/:id/assign', auth('handler'), async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task || task.status !== 'pending') return res.status(400).json({ message: 'Nelze přiřadit' });

  task.assignedTo = req.user.id;
  task.status = 'in_progress';
  task.pickedUpAt = new Date();
  await task.save();
  res.json(task);
});

router.put('/:id/complete', auth('handler'), async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task || task.assignedTo !== req.user.id) return res.status(403).json({ message: 'Nelze dokončit' });

  task.status = 'done';
  task.completedAt = new Date();
  await task.save();
  res.json(task);
});

module.exports = router;
