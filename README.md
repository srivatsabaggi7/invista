# INVISTA - Intelligent Inventory Forecasting & Analytics

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-brightgreen.svg)](https://github.com/your-username/invista)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: MERN + Python AI](https://img.shields.io/badge/Stack-MERN%20%2B%20Python%20AI-blue.svg)]()

**INVISTA** is an enterprise-grade, AI-powered inventory management platform designed to optimize supply chain operations using **Agentic AI** and predictive analytics. The system integrates high-performance time-series forecasting with a multi-agent orchestration framework to automate complex reordering decisions while maintaining a human-in-the-loop approval mechanism.

---

## 🚀 Core Features

- **Agentic Multi-Agent Architecture**: A collaborative ecosystem of specialized AI agents (Forecasting, Optimization, Risk, Anomaly, and Decision) that reason together to produce optimal outcomes.
- **Predictive Demand Forecasting**: Hybrid ensemble models utilizing Prophet and LSTM to project demand with statistical uncertainty estimation.
- **Supply Chain Optimization**: Dynamic Economic Order Quantity (EOQ) and Reorder Point (ROP) calculations based on stochastic demand and lead-time variability.
- **Autonomous Decision Engine**: A sophisticated decision agent that synthesizes multi-agent insights into actionable strategies (Order, Watch, Hold).
- **Human-in-the-Loop (HITL)**: Interactive dashboard for managers to review AI reasoning, audit decision paths, and provide final approvals.
- **Enterprise Dashboard**: Modern, high-performance UI built with React and Tailwind CSS, featuring real-time data visualizations and agent reasoning logs.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS, Plotly.js, React Router
- **Backend**: Node.js, Express.js (RESTful API Orchestration)
- **AI Core**: Python 3.11, NumPy, Pandas, Scikit-learn, Prophet
- **Data Persistence**: JSON-based Document Store (Scalable to MongoDB/PostgreSQL)
- **Agent Framework**: Custom Multi-Agent Orchestration (Inspired by LangGraph/CrewAI)

---

## 📂 Project Structure

```bash
invista/
├── agents/             # Python-based Intelligent Agents
│   ├── base_agent.py   # Standardized Agent Interface
│   ├── forecast_agent.py
│   ├── optimization_agent.py
│   └── ...
├── backend/            # Node.js API & Orchestration Layer
│   ├── src/
│   │   ├── controllers/
│   │   ├── orchestrator/ # Multi-agent execution logic
│   │   └── services/
├── frontend/           # React 19 Dashboard
│   ├── src/
│   │   ├── components/ # Atomic UI components
│   │   └── pages/      # Dashboard & Admin views
└── data/               # Simulation data and configurations
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Backend & Agents
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Install Node.js dependencies:
   ```bash
   cd backend && npm install
   ```
3. Start the backend:
   ```bash
   npm start
   ```

### Frontend
1. Install dependencies:
   ```bash
   cd frontend && npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🧠 Agent Reasoning Flow

1. **PredictiveDemandAgent**: Analyzes historical trends and generates 30/90-day forecasts.
2. **OptimizationAgent**: Computes EOQ and ROP based on forecasted demand and service levels.
3. **SupplierRiskAgent**: Evaluates lead-time reliability and supplier performance.
4. **AnomalyDetectionAgent**: Scans for irregular spikes or supply chain disruptions.
5. **AutonomousDecisionAgent**: Synthesizes all inputs to recommend a final action with a detailed reasoning path.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Developed by Birru Bhuvaneshwari Devi, Puvvula Kishan, Srivatsa V Baggi, and Vujjani Om Prakash.*
