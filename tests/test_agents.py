import sys
import os
import unittest
import json

# Add root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from agents.forecast_agent import DemandForecastAgent
from agents.optimization_agent import InventoryOptimizationAgent
from agents.decision_agent import DecisionAgent

class TestAgents(unittest.TestCase):
    def setUp(self):
        self.forecast_agent = DemandForecastAgent()
        self.optimization_agent = InventoryOptimizationAgent()
        self.decision_agent = DecisionAgent()

    def test_forecast_agent(self):
        context = {"forecast": [10, 12, 11, 13, 10]}
        result = self.forecast_agent.run(context)
        self.assertEqual(result["status"], "OK")
        self.assertIn("avg_daily_demand", result["output"])
        self.assertGreater(result["confidence"], 0)

    def test_optimization_agent(self):
        context = {
            "forecast_summary": {"avg_daily_demand": 10, "uncertainty": 2},
            "lead_time_days": 3
        }
        result = self.optimization_agent.run(context)
        self.assertEqual(result["status"], "OK")
        self.assertIn("reorder_point", result["output"])

    def test_decision_agent_order(self):
        context = {
            "inventory": {"current_stock": 5},
            "optimization": {"output": {"reorder_point": 20, "EOQ": 50}},
            "supplier": {"output": {"risk_level": "LOW"}},
            "forecast_summary": {"avg_daily_demand": 10}
        }
        result = self.decision_agent.run(context)
        self.assertEqual(result["output"]["decision"], "ORDER")

if __name__ == "__main__":
    unittest.main()
