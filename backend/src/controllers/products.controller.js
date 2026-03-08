import { readJSON } from '../services/file.service.js';

export function getProducts(req, res) {
  res.json(readJSON('products.json'));
}
