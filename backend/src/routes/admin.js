const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const { z } = require("zod");
const {
  Contact,
  Consultation,
  HealthCheckup,
  LeadMagnet,
  Application,
} = require("../models");

const router = express.Router();

const kinds = {
  contacts: Contact,
  consultations: Consultation,
  "health-checkups": HealthCheckup,
  "lead-magnets": LeadMagnet,
  applications: Application,
};
const hasStatus = ["contacts", "consultations", "health-checkups", "applications"];

const safeEqual = (a, b) => {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Please try again later." },
});

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

router.post("/login", loginLimiter, (req, res) => {
  const { email, password } = req.body || {};
  const configured =
    process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.JWT_SECRET;
  const ok =
    configured &&
    safeEqual(email ?? "", process.env.ADMIN_EMAIL) &&
    safeEqual(password ?? "", process.env.ADMIN_PASSWORD);
  if (!ok) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ success: true, message: "Logged in", data: { token } });
});

router.get("/stats", requireAdmin, async (_req, res) => {
  const [contacts, consultations, healthCheckups, leadMagnets, applications] =
    await Promise.all([
      Contact.countDocuments(),
      Consultation.countDocuments(),
      HealthCheckup.countDocuments(),
      LeadMagnet.countDocuments(),
      Application.countDocuments(),
    ]);
  res.json({
    success: true,
    data: { contacts, consultations, healthCheckups, leadMagnets, applications },
  });
});

router.get("/list/:kind", requireAdmin, async (req, res) => {
  const Model = kinds[req.params.kind];
  if (!Model) return res.status(404).json({ success: false, message: "Unknown list" });
  const query = Model.find().sort({ createdAt: -1 }).limit(200);
  if (req.params.kind === "applications") query.select("-resume.data");
  const items = await query.lean();
  res.json({ success: true, data: items });
});

router.patch("/status/:kind/:id", requireAdmin, async (req, res) => {
  const { kind, id } = req.params;
  const status = z.enum(["new", "in-progress", "closed"]).safeParse(req.body?.status);
  if (!hasStatus.includes(kind) || !mongoose.isValidObjectId(id) || !status.success) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }
  const doc = await kinds[kind].findByIdAndUpdate(id, { status: status.data }, { new: true });
  if (!doc) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Status updated" });
});

router.get("/applications/:id/resume", requireAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
  const app = await Application.findById(req.params.id).select("resume");
  if (!app || !app.resume || !app.resume.data) {
    return res.status(404).json({ success: false, message: "Resume not found" });
  }
  res.setHeader("Content-Type", app.resume.mimetype || "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename*=UTF-8''${encodeURIComponent(app.resume.filename || "resume")}`
  );
  res.send(app.resume.data);
});

module.exports = router;