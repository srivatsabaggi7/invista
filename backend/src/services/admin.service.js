import { readData, writeData } from "./dataStore.service.js";

export function getUsers() {
  return readData("users", "users.json");
}

export function updateAgentConfig(agent, enabled) {
  const config = readData("config", "agents.json");
  config[agent].enabled = enabled;
  writeData("config", "agents.json", config);
  return config;
}

export function getAgentConfig() {
  return readData("config", "agents.json");
}

export function getSystemLogs() {
  return readData("logs", "system_logs.json");
}
