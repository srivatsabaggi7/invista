import time
from typing import Any, Dict, Optional

class BaseAgent:
    """
    Base class for all intelligent agents in the INVISTA ecosystem.
    Provides standardized communication and reasoning patterns.
    """
    def __init__(self, name: str, version: str = "1.0.0"):
        self.name = name
        self.version = version

    def respond(self, output: Any, confidence: float, explanation: str, metadata: Optional[Dict] = None) -> Dict:
        """
        Formats agent output into a standardized JSON response.
        """
        return {
            "agent": self.name,
            "version": self.version,
            "status": "OK",
            "timestamp": time.time(),
            "output": output,
            "confidence": round(float(confidence), 2),
            "explanation": explanation,
            "metadata": metadata or {}
        }

    def error(self, message: str) -> Dict:
        """
        Formats agent error response.
        """
        return {
            "agent": self.name,
            "status": "ERROR",
            "timestamp": time.time(),
            "message": message
        }
