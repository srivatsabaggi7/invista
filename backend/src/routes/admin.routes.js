import express from "express";
import {
  usersHandler,
  agentConfigHandler,
  agentConfigViewHandler,
  logsHandler
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", usersHandler);
router.get("/agents", agentConfigViewHandler);
router.post("/agents", agentConfigHandler);
router.get("/logs", logsHandler);

export default router;
