import test from "node:test";
import assert from "node:assert/strict";
import { species, recentExtinctions } from "../data.js";
test("homepage media stays inside the GitHub Pages project directory", () => {
  for (const record of [...species, ...recentExtinctions]) {
    for (const key of ["portraitImage", "habitatVideo", "image", "audioSrc"]) {
      if (record[key]) assert.equal(record[key].startsWith("/"), false, `${key}: ${record[key]}`);
    }
  }
});
