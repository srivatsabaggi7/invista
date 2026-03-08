import json
import os
import time
from typing import Dict, Any

from agents.forecast_agent import DemandForecastAgent
from agents.optimization_agent import InventoryOptimizationAgent
from agents.supplier_agent import SupplierRiskAgent
from agents.anomaly_agent import AnomalyDetectionAgent
from agents.decision_agent import DecisionAgent

# ---------- DATA ROOT (shared with backend) ----------
DATA_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../data")
)

class DecisionOrchestrator:
    """
    Core engine that coordinates multi-agent reasoning.
    Implements a sequential reasoning chain where each agent's output 
    informs the next step of the inventory decision process.
    """
    def __init__(self):
        self.agents = {
            "ForecastAgent": DemandForecastAgent(),
            "OptimizationAgent": InventoryOptimizationAgent(),
            "SupplierRiskAgent": SupplierRiskAgent(),
            "AnomalyDetectionAgent": AnomalyDetectionAgent(),
            "DecisionAgent": DecisionAgent()
        }

    def is_enabled(self, agent_name: str) -> bool:
        """Checks if an agent is enabled in the global configuration."""
        try:
            config_path = os.path.join(DATA_ROOT, "config/agents.json")
            if not os.path.exists(config_path):
                return True
            with open(config_path) as f:
                config = json.load(f)
            return config.get(agent_name, {}).get("enabled", True)
        except Exception as e:
            print(f"Config error for {agent_name}: {e}")
            return True

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes the agentic workflow.
        Returns a structured dictionary of all agent reasonings and final decision.
        """
        results = {}
        start_time = time.time()

        # 1. Demand Forecasting
        if self.is_enabled("ForecastAgent"):
            forecast_result = self.agents["ForecastAgent"].run(context)
            results["forecast"] = forecast_result
            context["forecast_summary"] = forecast_result.get("output", {})
        else:
            results["forecast"] = {"agent": "ForecastAgent", "status": "DISABLED"}

        # 2. Inventory Optimization (Requires Forecast)
        if self.is_enabled("OptimizationAgent"):
            optimization_result = self.agents["OptimizationAgent"].run(context)
            results["optimization"] = optimization_result
            context["optimization"] = optimization_result
        else:
            results["optimization"] = {"agent": "OptimizationAgent", "status": "DISABLED"}

        # 3. Supplier Risk Assessment
        if self.is_enabled("SupplierRiskAgent"):
            supplier_result = self.agents["SupplierRiskAgent"].run(context)
            results["supplier"] = supplier_result
            context["supplier"] = supplier_result
        else:
            results["supplier"] = {"agent": "SupplierRiskAgent", "status": "DISABLED"}

        # 4. Anomaly Detection
        if self.is_enabled("AnomalyDetectionAgent"):
            anomaly_result = self.agents["AnomalyDetectionAgent"].run(context)
            results["anomaly"] = anomaly_result
            context["anomaly"] = anomaly_result
        else:
            results["anomaly"] = {"agent": "AnomalyDetectionAgent", "status": "DISABLED"}

        # 5. Autonomous Decision (Final synthesis)
        decision_result = self.agents["DecisionAgent"].run(context)
        results["decision"] = decision_result

        # Meta-information for the orchestrator
        results["orchestrator_meta"] = {
            "execution_time_ms": round((time.time() - start_time) * 1000, 2),
            "agents_active": [k for k, v in results.items() if v.get("status") == "OK"]
        }

        return results
