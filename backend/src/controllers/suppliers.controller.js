import { readJSON } from '../services/file.service.js';

export function getSuppliers(req, res) {
  res.json(readJSON('suppliers.json'));
}
