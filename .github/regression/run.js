'use strict';
const fs = require("fs");

// todo, also output runtimes

let files = fs.readdirSync(".", {withFileTypes: true});
files = files.filter(f => f.isFile());
files = files.filter(f => f.name.endsWith(".json"));

let map = {};
for (let f of files) {
  const name = f.name.split("#")[0];
  if (map[name] === undefined) {
    map[name] = {};
  }
  const contents = fs.readFileSync(f.name, "utf-8");
  if (f.name.endsWith("#before.json")) {
    map[name].before = JSON.parse(contents);
  } else {
    map[name].after = JSON.parse(contents);
  }
}

let comment = "";
for (let name in map) {
  if (map[name].before.length === map[name].after.length) {
    comment += name + ": match :green_circle:";
  } else {
    comment += name + ": fail :red_circle:";
  }
}

console.dir(comment);

fs.writeFileSync("comment-body.txt", comment);