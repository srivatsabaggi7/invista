import { useEffect, useState } from "react";

import SKUSelector from "../components/SKUSelector";
import HorizonToggle from "../components/HorizonToggle";
import ModelToggle from "../components/ModelToggle";
import ForecastChart from "../components/ForecastChart";
import EOQCards from "../components/EOQCards";
import AgentPanel from "../components/AgentPanel";
import Card from "../components/Card";

import { fetchForecast, fetchEOQ, fetchAgent } from "../services/api";

export default function Dashboard() {
  const [sku, setSku] = useState("engine-oil");
  const [horizon, setHorizon] = useState(30);
  const [mode, setMode] = useState("compare");

  const [forecast, setForecast] = useState(null);
  const [eoq, setEOQ] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    fetchForecast(sku, horizon).then(setForecast);
    fetchEOQ(sku).then(setEOQ);
    fetchAgent(sku).then(setAgent);
  }, [sku, horizon]);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>
        INVISTA
        <span style={{ color: "#2563eb" }}>
          {" "}• Intelligent Inventory Analytics
        </span>
      </h1>

      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <SKUSelector value={sku} onChange={setSku} />
        <HorizonToggle value={horizon} onChange={setHorizon} />
        <ModelToggle value={mode} onChange={setMode} />
      </div>

      <Card title="Demand Forecast">
        <ForecastChart data={forecast} mode={mode} />
      </Card>

      <Card title="Inventory Optimization (EOQ)">
        <EOQCards data={eoq} />
      </Card>

      <Card title="Agentic Decision System">
        <AgentPanel data={agent} />
      </Card>
    </div>
  );
}
