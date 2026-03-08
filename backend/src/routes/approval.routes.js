import express from "express";
import { approveDecisionHandler, rejectDecisionHandler } from "../controllers/approval.controller.js";

const router = express.Router();

router.post("/approve", approveDecisionHandler);
router.post("/reject", rejectDecisionHandler);

export default router;
