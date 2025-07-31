const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fromZone: DataTypes.STRING,
  fromPosition: DataTypes.STRING,
  toZone: DataTypes.STRING,
  priority: { type: DataTypes.ENUM('normal', 'urgent'), defaultValue: 'normal' },
  status: { type: DataTypes.ENUM('pending', 'in_progress', 'done'), defaultValue: 'pending' },
  assignedTo: { type: DataTypes.UUID, allowNull: true },
  pickedUpAt: DataTypes.DATE,
  completedAt: DataTypes.DATE
});

module.exports = Task;
