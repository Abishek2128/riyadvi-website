const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: (process.env.CLIENT_URL || "*").split(",") }));
app.use(express.json());

app.get("/api/health", (_req, res) =>
  res.json({ success: true, message: "API running" })
);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`API on ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });