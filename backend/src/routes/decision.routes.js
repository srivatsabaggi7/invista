import express from "express";
import { runDecisionHandler } from "../controllers/decision.controller.js";

const router = express.Router();

router.post("/run", runDecisionHandler);

export default router;
