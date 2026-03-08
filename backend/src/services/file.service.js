import fs from 'fs';
import path from 'path';

export function readJSON(relativePath) {
  const filePath = path.join(process.cwd(), '..', 'data', relativePath);
  return JSON.parse(fs.readFileSync(filePath));
}
