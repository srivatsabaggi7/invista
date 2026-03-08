export default function AgentReasoningPanel({ agents }) {
  if (!agents) return null;

  // Filter out meta info and decision (shown separately)
  const agentEntries = Object.entries(agents).filter(
    ([key]) => !["decision", "orchestrator_meta"].includes(key)
  );

  return (
    <div className="space-y-4">
      {agentEntries.map(([key, agent]) => {
        const isError = agent.status === "ERROR";
        const isDisabled = agent.status === "DISABLED";
        const confidence = agent.confidence || 0;

        return (
          <div
            key={key}
            className={`group border rounded-xl p-4 transition-all hover:shadow-md ${
              isDisabled ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  isDisabled ? "bg-slate-300" : isError ? "bg-red-500" : "bg-green-500"
                }`}></span>
                <span className="text-sm font-bold text-slate-800 tracking-tight">
                  {agent.agent || key}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono uppercase">
                  v{agent.version || "1.0"}
                </span>
              </div>
              {!isDisabled && !isError && (
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Confidence: {(confidence * 100).toFixed(0)}%
                </div>
              )}
            </div>

            {isDisabled ? (
              <div className="text-xs text-slate-400 italic">Agent disabled by system administrator.</div>
            ) : isError ? (
              <div className="text-xs text-red-500 font-medium bg-red-50 p-2 rounded">{agent.message}</div>
            ) : (
              <>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {agent.explanation}
                </div>
                
                {agent.metadata && Object.keys(agent.metadata).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(agent.metadata).map(([mKey, mVal]) => (
                      <div key={mKey} className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        {mKey}: {JSON.stringify(mVal)}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}

      {agents.orchestrator_meta && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono uppercase tracking-tighter">
          <span>Orchestration Latency: {agents.orchestrator_meta.execution_time_ms}ms</span>
          <span>Status: System Optimized</span>
        </div>
      )}
    </div>
  );
}
