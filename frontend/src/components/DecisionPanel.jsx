import { useState } from "react";
import { approveDecision } from "../services/approvalApi";

export default function DecisionPanel({ decisionBlock, sku, onResult }) {
  const [status, setStatus] = useState(null); // 'APPROVED' | 'REJECTED'

  if (status) {
    const isApproved = status === "APPROVED";
    const quantity = decisionBlock?.output?.order_quantity || 0;
    return (
      <div className={`border rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300 ${
        isApproved ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}>
        <div className="text-4xl mb-4">{isApproved ? "🚀" : "🛑"}</div>
        <h3 className={`text-xl font-bold mb-2 ${isApproved ? "text-green-800" : "text-red-800"}`}>
          Decision {status === "APPROVED" ? "Executed" : "Overridden"}
        </h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto">
          {isApproved 
            ? `The inventory for ${sku} has been updated with ${quantity} units. The system logs have been synchronized.`
            : `The AI recommendation for ${sku} was declined. The system will continue to monitor the SKU status.`
          }
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
        >
          Refresh Dashboard →
        </button>
      </div>
    );
  }

  if (!decisionBlock) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-500 italic text-sm text-center">
        Waiting for Decision Agent synthesis...
      </div>
    );
  }

  if (decisionBlock.status === "ERROR") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800">
        <div className="flex items-center gap-2 mb-2 font-bold uppercase tracking-widest text-xs opacity-70">
          <span>⚠️</span>
          <span>Agent Execution Failed</span>
        </div>
        <p className="text-sm font-medium">{decisionBlock.message || "An unexpected error occurred in the Decision Agent."}</p>
      </div>
    );
  }

  if (decisionBlock.status !== "OK") {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-500 italic text-sm">
        Agent status is currently "{decisionBlock.status}". 
        {decisionBlock.explanation || "No additional reasoning provided by the agent."}
      </div>
    );
  }

  const decision = decisionBlock.output.decision;
  const quantity = decisionBlock.output.order_quantity;
  const confidence = decisionBlock.confidence;

  const handleApprove = async () => {
    await approveDecision({
      sku,
      decision,
      quantity,
      status: "APPROVED",
      timestamp: new Date().toISOString(),
    });
    setStatus("APPROVED");
    onResult();
  };

  const handleReject = async () => {
    await approveDecision({
      sku,
      decision,
      quantity,
      status: "REJECTED",
      timestamp: new Date().toISOString(),
    });
    setStatus("REJECTED");
    onResult();
  };

  const getStatusStyles = (d) => {
    switch (d) {
      case "ORDER":
      case "ORDER_SMALL_URGENT":
        return "bg-amber-100 border-amber-300 text-amber-900";
      case "WATCH":
        return "bg-blue-100 border-blue-300 text-blue-900";
      case "HOLD":
        return "bg-green-100 border-green-300 text-green-900";
      default:
        return "bg-slate-100 border-slate-300 text-slate-900";
    }
  };

  return (
    <div className="space-y-6">
      <div className={`border rounded-2xl p-6 ${getStatusStyles(decision)}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">System Recommendation</span>
              <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded-full font-bold">Confidence: {(confidence * 100).toFixed(0)}%</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">{decision.replace(/_/g, " ")}</h2>
            <p className="text-sm mt-2 opacity-80 leading-relaxed max-w-2xl">
              {decisionBlock.explanation}
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/20 min-w-[160px] text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Target Quantity</div>
            <div className="text-2xl font-black">{quantity} <span className="text-xs font-medium">units</span></div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleApprove}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 group"
        >
          <span>✅</span>
          <span>Approve Decision</span>
        </button>
        <button
          onClick={handleReject}
          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border-2 border-slate-200 transition-all flex items-center justify-center gap-2"
        >
          <span>❌</span>
          <span>Reject Decision</span>
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div className="text-xs text-slate-500 leading-normal">
          <span className="font-bold text-slate-700">Reasoning Path:</span> {decisionBlock.output.reasoning_path}. 
          This recommendation is based on real-time inventory levels, forecasted demand volatility, and current supplier risk indices.
        </div>
      </div>
    </div>
  );
}
