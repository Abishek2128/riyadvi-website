const express = require("express");
const { Service, Project, Post, Job } = require("../models/content");

const router = express.Router();

function publicList(path, Model, sort) {
  router.get(path, async (_req, res) => {
    const items = await Model.find().sort(sort).select("-__v").lean();
    res.set("Cache-Control", "public, max-age=60, s-maxage=300");
    res.json({ success: true, data: items });
  });

  router.get(`${path}/:slug`, async (req, res) => {
    const slug = String(req.params.slug).slice(0, 120);
    const item = await Model.findOne({ slug }).select("-__v").lean();
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.set("Cache-Control", "public, max-age=60, s-maxage=300");
    res.json({ success: true, data: item });
  });
}

publicList("/services", Service, { order: 1 });
publicList("/projects", Project, { order: 1 });
publicList("/posts", Post, { date: -1 });
publicList("/jobs", Job, { order: 1 });

module.exports = router;