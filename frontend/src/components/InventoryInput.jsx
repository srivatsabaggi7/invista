import { useState } from "react";

export default function InventoryInput({ onSubmit, loading }) {
  const [sku, setSku] = useState("engine-oil");
  const [stock, setStock] = useState(25);
  const [leadTime, setLeadTime] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ sku, current_stock: Number(stock), lead_time_days: Number(leadTime) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
          Product Selection
        </label>
        <select
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
        >
          <option value="engine-oil">Engine Oil (High Volatility)</option>
          <option value="brake-pads">Brake Pads (Stable Demand)</option>
          <option value="radiator">Radiator (Seasonal)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Current Stock
          </label>
          <div className="relative">
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">units</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Lead Time
          </label>
          <div className="relative">
            <input
              type="number"
              value={leadTime}
              onChange={(e) => setLeadTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">days</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
          loading 
            ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
            : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
        }`}
      >
        {loading ? (
          <>
            <span className="animate-spin text-lg">⏳</span>
            <span>Synthesizing...</span>
          </>
        ) : (
          <>
            <span>⚡</span>
            <span>Run AI Orchestrator</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-slate-400 text-center leading-tight px-4">
        Orchestration involves Forecasting, Risk Assessment, and Anomaly Detection agents.
      </p>
    </form>
  );
}
