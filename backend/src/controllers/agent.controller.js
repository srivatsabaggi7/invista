import { getAgentDecision } from '../services/agent.service.js';

export function agentHandler(req, res) {
  res.json(getAgentDecision(req.params.sku));
}
