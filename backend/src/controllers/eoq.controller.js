import { getEOQ } from '../services/eoq.service.js';

export function eoqHandler(req, res) {
  res.json(getEOQ(req.params.sku));
}
