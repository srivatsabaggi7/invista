import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ROUTES (imports only — no usage yet)
import decisionRoutes from "./src/routes/decision.routes.js";
import approvalRoutes from "./src/routes/approval.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

// 1️⃣ INITIALIZE APP FIRST
const app = express();

// 2️⃣ GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3️⃣ ROUTES (AFTER app is defined)
app.use("/api/decision", decisionRoutes);
app.use("/api/approval", approvalRoutes);
app.use("/api/admin", adminRoutes);

// 4️⃣ SERVE FRONTEND STATIC FILES
const frontendPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// 5️⃣ HEALTH CHECK & CATCH-ALL FOR SPA
app.get("/api/health", (req, res) => {
  res.send("INVISTA backend running");
});

app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 6️⃣ START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
