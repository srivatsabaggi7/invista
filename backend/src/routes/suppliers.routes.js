import express from 'express';
import { getSuppliers } from '../controllers/suppliers.controller.js';

const router = express.Router();

router.get('/', getSuppliers);

export default router;
