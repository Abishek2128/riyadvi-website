const mongoose = require("mongoose");

const options = { timestamps: true };
const statusField = {
  type: String,
  enum: ["new", "in-progress", "closed"],
  default: "new",
};

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      company: String,
      requirement: String,
      message: String,
      status: statusField,
    },
    options
  )
);

const Consultation = mongoose.model(
  "Consultation",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      company: String,
      preferredDate: String,
      message: String,
      status: statusField,
    },
    options
  )
);

const HealthCheckup = mongoose.model(
  "HealthCheckup",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      company: String,
      industry: String,
      website: String,
      teamSize: String,
      marketing: String,
      technology: String,
      challenges: String,
      status: statusField,
    },
    options
  )
);

const LeadMagnet = mongoose.model(
  "LeadMagnet",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      company: String,
      email: { type: String, required: true },
      phone: String,
    },
    options
  )
);

const Application = mongoose.model(
  "Application",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      position: { type: String, required: true },
      message: String,
      resumeUrl: String,
      status: statusField,
    },
    options
  )
);

module.exports = { Contact, Consultation, HealthCheckup, LeadMagnet, Application };