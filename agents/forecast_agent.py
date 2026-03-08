from typing import Dict, Any
import numpy as np
from agents.base_agent import BaseAgent

class DemandForecastAgent(BaseAgent):
    """
    Forecasting Agent utilizing time-series ensembles (Prophet/LSTM simulations).
    Computes mean demand and prediction uncertainty for inventory planning.
    """
    def __init__(self):
        super().__init__("PredictiveDemandAgent", version="1.1.0")

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyzes forecast data to extract actionable demand metrics.
        """
        try:
            forecast_data = context.get("forecast", [])
            if not forecast_data:
                return self.error("No forecast data provided in context.")

            avg_demand = np.mean(forecast_data)
            uncertainty = np.std(forecast_data)
            max_demand = np.max(forecast_data)
            min_demand = np.min(forecast_data)

            # Confidence based on volatility (lower uncertainty = higher confidence)
            volatility = uncertainty / (avg_demand + 1e-6)
            confidence = max(0.5, 1.0 - volatility)

            return self.respond(
                output={
                    "avg_daily_demand": round(float(avg_demand), 2),
                    "uncertainty": round(float(uncertainty), 2),
                    "volatility_index": round(float(volatility), 3)
                },
                confidence=confidence,
                explanation=(
                    f"Forecasted demand averages {avg_demand:.1f} units with "
                    f"{'low' if volatility < 0.2 else 'moderate' if volatility < 0.5 else 'high'} volatility."
                ),
                metadata={
                    "range": [round(float(min_demand), 2), round(float(max_demand), 2)],
                    "forecast_horizon": len(forecast_data)
                }
            )
        except Exception as e:
            return self.error(f"Forecasting analysis failed: {str(e)}")
