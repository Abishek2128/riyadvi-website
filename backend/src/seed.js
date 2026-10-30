const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { Service, Project, Post, Job } = require("./models/content");

const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "seed", name), "utf8"));

async function upsertAll(Model, items) {
  const ops = items.map((item, i) => ({
    updateOne: {
      filter: { slug: item.slug },
      update: { $set: { ...item, order: i } },
      upsert: true,
    },
  }));
  await Model.bulkWrite(ops);
}

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const jobs = [
    [Service, "services.json"],
    [Project, "projects.json"],
    [Post, "posts.json"],
    [Job, "jobs.json"],
  ];
  for (const [Model, file] of jobs) {
    const items = read(file);
    await upsertAll(Model, items);
    console.log(`${Model.modelName}: ${items.length} saved`);
  }
  await mongoose.disconnect();
  console.log("Seed finished");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});