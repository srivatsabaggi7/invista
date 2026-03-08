import json
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../")))
from decision_orchestrator import DecisionOrchestrator
DATA_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../data")
)

def main():
    context = json.loads(sys.argv[1])
    orchestrator = DecisionOrchestrator()
    result = orchestrator.run(context)
    print(json.dumps(result))

if __name__ == "__main__":
    main()
