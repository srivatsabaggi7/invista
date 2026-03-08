import { useEffect, useState } from "react";
import UICard from "../components/UICard";

export default function AdminPanel() {
  const [agents, setAgents] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/admin/agents")
      .then((r) => r.json())
      .then(setAgents);
  }, []);

  const toggleAgent = async (name) => {
    setLoading(true);
    const newState = !agents[name].enabled;
    
    try {
      await fetch("http://localhost:3001/api/admin/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent: name, enabled: newState }),
      });
      
      setAgents({
        ...agents,
        [name]: { ...agents[name], enabled: newState },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">System Configuration</h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage multi-agent orchestration settings and system overrides.
        </p>
      </header>

      <div className="max-w-3xl">
        <UICard 
          title="Agent Orchestration Control" 
          subtitle="Enable or disable specific agents in the reasoning pipeline"
        >
          <div className="space-y-4">
            {Object.entries(agents).map(([name, config]) => (
              <div 
                key={name} 
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all"
              >
                <div>
                  <div className="text-sm font-bold text-slate-800">{name}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">
                    Status: {config.enabled ? "ACTIVE" : "DISABLED"}
                  </div>
                </div>
                
                <button
                  onClick={() => toggleAgent(name)}
                  disabled={loading}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    config.enabled ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}

            {Object.keys(agents).length === 0 && (
              <div className="text-center py-8 text-slate-400 italic text-sm">
                Loading agent configuration...
              </div>
            )}
          </div>
        </UICard>
      </div>

      <div className="mt-12 bg-amber-50 border border-amber-100 p-6 rounded-2xl max-w-3xl flex gap-4">
        <span className="text-2xl">⚠️</span>
        <div>
          <h4 className="text-sm font-bold text-amber-900 mb-1 font-mono uppercase tracking-tight">Critical System Note</h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            Disabling core agents like the <span className="font-bold">ForecastAgent</span> or <span className="font-bold">OptimizationAgent</span> 
            will force the <span className="font-bold">AutonomousDecisionAgent</span> to operate with incomplete data, 
            potentially reducing confidence scores and decision accuracy. Use with caution in production environments.
          </p>
        </div>
      </div>
    </div>
  );
}
