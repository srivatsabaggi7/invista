import {
  getUsers,
  updateAgentConfig,
  getAgentConfig,
  getSystemLogs
} from "../services/admin.service.js";

export function usersHandler(req, res) {
  res.json(getUsers());
}

export function agentConfigHandler(req, res) {
  const { agent, enabled } = req.body;
  res.json(updateAgentConfig(agent, enabled));
}

export function agentConfigViewHandler(req, res) {
  res.json(getAgentConfig());
}

export function logsHandler(req, res) {
  res.json(getSystemLogs());
}
