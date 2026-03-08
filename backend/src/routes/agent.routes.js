import express from 'express';
import { agentHandler } from '../controllers/agent.controller.js';

const router = express.Router();
router.get('/:sku', agentHandler);

export default router;
