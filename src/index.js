const { readFileSync, writeFileSync } = require("fs");

const html = require("./html");
const css = require("./css");
const js = require("./js");

let classMap = new Map();
let index = 97;
function next() {
  return String.fromCharCode(index++);
}

let ctx = {
  classMap,
  next
};

const htmlInput = readFileSync("input/index.html", "utf-8");
const htmlOutput = html(ctx, htmlInput);
writeFileSync("output/index.html", htmlOutput);

const cssInput = readFileSync("input/styles.css", "utf-8");
const cssOutput = css(ctx, cssInput);
writeFileSync("output/styles.css", cssOutput);

const jsInput = readFileSync("input/index.js", "utf-8");
const jsOutput = js(ctx, jsInput);
writeFileSync("output/index.js", jsOutput);