const mongoose = require("mongoose");

const { Schema } = mongoose;
const options = { timestamps: true };
const slug = { type: String, required: true, unique: true, trim: true };

const Service = mongoose.model(
  "Service",
  new Schema(
    {
      slug,
      title: { type: String, required: true },
      short: String,
      scene: String,
      problem: String,
      solution: String,
      features: [String],
      useCases: [String],
      stack: [String],
      order: { type: Number, default: 0 },
    },
    options
  )
);

const Project = mongoose.model(
  "Project",
  new Schema(
    {
      slug,
      client: { type: String, required: true },
      industry: String,
      summary: String,
      challenge: String,
      solution: String,
      technologies: [String],
      results: [String],
      services: [String],
      scene: String,
      order: { type: Number, default: 0 },
    },
    options
  )
);

const Post = mongoose.model(
  "Post",
  new Schema(
    {
      slug,
      title: { type: String, required: true },
      excerpt: String,
      category: String,
      tags: [String],
      author: String,
      date: String,
      featured: { type: Boolean, default: false },
      body: [new Schema({ h: String, p: String }, { _id: false })],
      order: { type: Number, default: 0 },
    },
    options
  )
);

const Job = mongoose.model(
  "Job",
  new Schema(
    {
      slug,
      title: { type: String, required: true },
      department: String,
      designation: String,
      experience: String,
      location: String,
      type: String,
      summary: String,
      responsibilities: [String],
      requirements: [String],
      order: { type: Number, default: 0 },
    },
    options
  )
);

module.exports = { Service, Project, Post, Job };