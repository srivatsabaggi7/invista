import express from 'express';
import { eoqHandler } from '../controllers/eoq.controller.js';

const router = express.Router();
router.get('/:sku', eoqHandler);

export default router;
