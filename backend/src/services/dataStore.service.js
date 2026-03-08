import fs from "fs";
import path from "path";

// DATA ROOT = invista/data
const DATA_ROOT = path.resolve(process.cwd(), "../data");

export function readData(folder, file) {
  const filePath = path.join(DATA_ROOT, folder, file);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeData(folder, file, data) {
  const dirPath = path.join(DATA_ROOT, folder);
  const filePath = path.join(dirPath, file);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
