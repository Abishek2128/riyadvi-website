const express = require("express");
const { z } = require("zod");
const {
  Contact,
  Consultation,
  HealthCheckup,
  LeadMagnet,
  Application,
} = require("../models");

const router = express.Router();

const text = (min = 2, max = 200) => z.string().trim().min(min).max(max);
const optionalText = (max = 1000) => z.string().trim().max(max).optional().default("");
const email = z.string().trim().email("Enter a valid email address");
const phone = z
  .string()
  .trim()
  .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number");
const optionalPhone = phone.optional().or(z.literal("")).default("");

const schemas = {
  contact: z.object({
    name: text(),
    email,
    phone: optionalPhone,
    company: optionalText(150),
    requirement: optionalText(200),
    message: text(5, 2000),
  }),
  consultation: z.object({
    name: text(),
    email,
    phone: optionalPhone,
    company: optionalText(150),
    preferredDate: optionalText(50),
    message: optionalText(2000),
  }),
  healthCheckup: z.object({
    name: text(),
    email,
    phone: optionalPhone,
    company: optionalText(150),
    industry: optionalText(150),
    website: optionalText(200),
    teamSize: optionalText(50),
    marketing: optionalText(1000),
    technology: optionalText(1000),
    challenges: optionalText(2000),
  }),
  leadMagnet: z.object({
    name: text(),
    company: text(1, 150),
    email,
    phone: phone,
  }),
  application: z.object({
    name: text(),
    email,
    phone,
    position: text(2, 150),
    message: optionalText(2000),
    resumeUrl: optionalText(500),
  }),
};

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    });
  }
  req.body = result.data;
  next();
};

function createRoute(path, schema, Model, successMessage) {
  router.post(path, validate(schema), async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      success: true,
      message: successMessage,
      data: { id: doc._id },
    });
  });
}

createRoute("/contact", schemas.contact, Contact, "Thanks, we received your message.");
createRoute("/consultation", schemas.consultation, Consultation, "Your consultation request is booked.");
createRoute("/health-checkup", schemas.healthCheckup, HealthCheckup, "Your business health checkup was submitted.");
createRoute("/lead-magnet", schemas.leadMagnet, LeadMagnet, "Your guide is ready to download.");
createRoute("/applications", schemas.application, Application, "Your application was submitted.");

module.exports = router;