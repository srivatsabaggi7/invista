import { spawn } from "child_process";
import path from "path";
import { readData, writeData } from "./dataStore.service.js";

export function runDecision(context) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve("./src/orchestrator/run_decision.py");


    const process = spawn("python", [scriptPath, JSON.stringify(context)]);

    let output = "";
    let error = "";

    process.stdout.on("data", data => output += data.toString());
    process.stderr.on("data", data => error += data.toString());

    process.on("close", code => {
  if (code !== 0) {
    console.error("Python exited with code:", code);
    console.error("Python stderr:", error);
    reject(error || "Python process failed");
  } else {
    if (error) {
      console.error("Python stderr:", error);
    }

    try {
      const result = JSON.parse(output);

      const decisions = readData("decisions", "decisions.json");
      decisions.push({
        sku: context.sku,
        timestamp: new Date().toISOString(),
        result
      });
      writeData("decisions", "decisions.json", decisions);

      resolve(result);
    } catch (e) {
      console.error("JSON parse error:", e);
      reject("Invalid JSON from Python");
    }
  }
});

  });
}
