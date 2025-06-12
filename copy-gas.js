import fs from "fs";
import path from "path";

const sourceDir = path.resolve("src/gas");
const destDir = path.resolve("dist");

function copyGasFiles() {
  if (!fs.existsSync(sourceDir)) {
    console.log("❌ src/gas не знайдено");
    return;
  }

  const files = fs
    .readdirSync(sourceDir)
    .filter(
      (f) => f.endsWith(".js") || f.endsWith(".html") || f.endsWith(".json")
    );

  files.forEach((file) => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);

    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Скопійовано: ${file}`);
  });

  console.log("🚀 GAS-файли (включно з .json) скопійовано до dist/");
}

copyGasFiles();
