const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models/index');
require('./models/User');
require('./models/Task');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log('Databáze připravena'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(process.env.PORT, () => {
  console.log(`Server běží na portu ${process.env.PORT}`);
});
