const fs = require("fs-extra");
const { execSync } = require("child_process");

async function build() {
  console.log("[COPY] Copy to dist...");
  fs.emptyDirSync("dist");
  fs.copySync("src", "dist");

  console.log("[PUSH] clasp push...");
  execSync("npx clasp push", { stdio: "inherit" });

  console.log("[DONE]");
}

build().catch(console.error);
