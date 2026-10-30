const ts = require("typescript");
const fs = require("fs");
const path = require("path");
const Module = require("module");

function load(file) {
  const src = fs.readFileSync(file, "utf8");
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const m = new Module(file);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  m._compile(out, file);
  return m.exports;
}

const dataDir = path.join(__dirname, "..", "src", "data");
const outDir = path.join(__dirname, "..", "..", "backend", "seed");
fs.mkdirSync(outDir, { recursive: true });

const write = (name, data) => {
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(data, null, 2));
  console.log(`${name}: ${data.length} items`);
};

(async () => {
  write("services.json", load(path.join(dataDir, "services.ts")).services);
  write("projects.json", load(path.join(dataDir, "projects.ts")).projects);
  write("posts.json", await load(path.join(dataDir, "posts.ts")).getAllPosts());
  write("jobs.json", await load(path.join(dataDir, "jobs.ts")).getAllJobs());
})();