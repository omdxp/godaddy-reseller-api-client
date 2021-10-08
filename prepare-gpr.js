import fs from "fs";

const p = JSON.parse(fs.readFileSync("./package.json", "utf8"));

p.name = `@Omar-Belghaouti/${p.name}`;

fs.writeFileSync("./package.json", JSON.stringify(p, null, 2));
