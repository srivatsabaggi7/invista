import express from "express";
import cors from "cors";

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
// 4️⃣ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("INVISTA backend running");
});

// 5️⃣ START SERVER
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
