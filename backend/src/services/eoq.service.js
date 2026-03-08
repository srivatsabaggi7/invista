import { readJSON } from './file.service.js';

export function getEOQ(sku) {
  return readJSON(`eoq/eoq_${sku}.json`);
}
