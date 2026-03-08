import { useState } from "react";
import InventoryInput from "../components/InventoryInput";
import AgentReasoningPanel from "../components/AgentReasoningPanel";
import DecisionPanel from "../components/DecisionPanel";
import ForecastEvidence from "../components/ForecastEvidence";
import EOQBreakdown from "../components/EOQBreakdown";
import DecisionHistory from "../components/DecisionHistory";
import UICard from "../components/UICard";
import { runDecision } from "../services/decisionApi";

export default function ManagerWorkspace() {
  const [result, setResult] = useState(null);
  const [sku, setSku] = useState("engine-oil");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleRun(input) {
    setLoading(true);
    setSku(input.sku);
    try {
      const res = await runDecision(input);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Manager Workspace</h2>
          <p className="text-sm text-slate-500 mt-1">
            Run AI-driven inventory analysis and review autonomous decisions.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input & Reasoning */}
        <div className="lg:col-span-1 space-y-6">
          <UICard title="Analysis Configuration" subtitle="Define SKU and constraints">
            <InventoryInput onSubmit={handleRun} loading={loading} />
          </UICard>

          {result && (
            <UICard title="Agent Logic Logs" subtitle="Multi-agent reasoning path">
              <AgentReasoningPanel agents={result} />
            </UICard>
          )}
        </div>

        {/* Right Column: Decision & Evidence */}
        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <>
              <UICard title="Autonomous AI Decision" subtitle="Final synthesis and action">
                <DecisionPanel
                  decisionBlock={result.decision}
                  sku={sku}
                  onResult={() => setRefreshKey((k) => k + 1)}
                />
              </UICard>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UICard title="Forecast Evidence" subtitle="30/90-day demand projection">
                  <ForecastEvidence forecast={result.forecast} />
                </UICard>

                <UICard title="Optimization Breakdown" subtitle="EOQ and Safety Stock analysis">
                  <EOQBreakdown optimization={result.optimization} />
                </UICard>
              </div>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 p-8 text-center bg-white shadow-sm">
              <div className="text-4xl mb-3 opacity-50">🤖</div>
              <p className="font-medium text-slate-500">No Analysis Performed</p>
              <p className="text-sm max-w-xs mt-1">Configure parameters and run the AI decision engine to generate insights.</p>
            </div>
          )}

          <UICard title="Historical Audit Trail" subtitle="Recent decisions and approvals">
            <DecisionHistory refreshKey={refreshKey} />
          </UICard>
        </div>
      </div>
    </div>
  );
}
