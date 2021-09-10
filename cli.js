#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
const { exec } = require("child_process");
const fs = require("fs");
const yaml = require("js-yaml");
const tmp = require("tmp");

if (!(argv.i && argv.o)) {
  console.log("Expected arguments:");
  console.log("  -i <path/to/docker-compose.yaml>");
  console.log("  -o <path/to/graph-output.png>");
  process.exit();
}

const composeContent = yaml.load(fs.readFileSync(argv.i, "utf8"));
const tmpobj = tmp.fileSync();
const sourceWriter = fs.createWriteStream(tmpobj.name);

sourceWriter.write(`graph TD;\n`);
Object.keys(composeContent.services).forEach((s) => {
  composeContent.services[s].depends_on?.forEach((dep) => {
    sourceWriter.write(` ${s}-->${dep};\n`);
  });
});
sourceWriter.end();

exec(`mmdc -i ${tmpobj.name} -o ${argv.o}`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`Chart written to: ${argv.o}`);
});

tmpobj.removeCallback();
