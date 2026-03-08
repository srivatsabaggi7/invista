import { readJSON } from './file.service.js';

export function getAgentDecision(sku) {
  return readJSON(`agent/agent_${sku}.json`);
}
