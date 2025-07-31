const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const sequelize = require("../server/models/index");

require("../server/models/User");
require("../server/models/Task");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => console.log("Databáze připravena"))
  .catch((err) => console.error("Chyba DB:", err));

app.get("/api/ping", (req, res) => {
  res.json({ ping: "pong" });
});

app.use("/api/auth", require("../server/routes/auth"));
app.use("/api/tasks", require("../server/routes/tasks"));

// 👇 KLÍČOVÉ pro Vercel:
module.exports = app;
module.exports.handler = serverless(app);
