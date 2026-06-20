// @ts-check

import crypto from "crypto";
import { readFileSync, writeFileSync } from "fs";
import fs from "fs";
import { parse } from "node-html-parser";
import path from "path";

const BUILD_DIR = path.resolve(process.cwd(), "build");
const CLIENT_PUBLIC_DIR = path.join(BUILD_DIR, "client");


/**
 * @param {string} startPath
 * @param {string} filter
 * @returns {string[]}
 */
function fromDir(startPath, filter) {
  /** @type {string[]} */
  let results = [];

  if (!fs.existsSync(startPath)) {
    console.warn("no dir ", startPath);
    return [];
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(fromDir(filename, filter)); // recurse
    } else if (filename.endsWith(filter)) {
      results.push(filename);
    };
  };

  return results;
};

const htmlFiles = fromDir(CLIENT_PUBLIC_DIR, ".html");

/** @type {{ [file: string]: string[] }} */
const hashMap = {};

htmlFiles.forEach((file) => {
  const html = readFileSync(file, "utf8");
  const root = parse(html);
  const scripts = root.querySelectorAll("script:not([src])");

  const hashes = scripts.map((script) => {
    const hash = crypto.createHash("sha256").update(script.text, "utf8").digest("base64");
    return `sha256-${hash}`;
  });

  console.debug("Computed", hashes.length, "hashes for", file);

  hashMap[file] = hashes;
});

writeFileSync("build/csp-hashes.json", JSON.stringify(hashMap, null, 2));
