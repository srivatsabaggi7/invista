import express from 'express';
import { forecastHandler } from '../controllers/forecast.controller.js';

const router = express.Router();
router.get('/:sku/:horizon', forecastHandler);

export default router;
