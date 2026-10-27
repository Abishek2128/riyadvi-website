const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const formRoutes = require("./routes/forms");
const adminRoutes = require("./routes/admin");

const app = express();
app.set("trust proxy", 1);
app.use(cors({ origin: (process.env.CLIENT_URL || "*").split(",") }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) =>
  res.json({ success: true, message: "Riyadvi API", health: "/api/health" })
);
app.get("/api/health", (_req, res) =>
  res.json({ success: true, message: "API running" })
);
app.use("/api", formRoutes);
app.use("/api/admin", adminRoutes);

app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Route not found" })
);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Something went wrong on the server" });
});

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