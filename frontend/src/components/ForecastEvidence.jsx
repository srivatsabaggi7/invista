export default function ForecastEvidence({ forecast }) {
  if (!forecast || forecast.status !== "OK") return null;

  const { avg_daily_demand, uncertainty, volatility_index } = forecast.output;
  const { range, forecast_horizon } = forecast.metadata;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mean Demand</div>
          <div className="text-xl font-black text-slate-800">{avg_daily_demand} <span className="text-[10px] font-medium text-slate-400">u/day</span></div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confidence Interval</div>
          <div className="text-sm font-bold text-slate-700">±{uncertainty} <span className="text-[10px] font-medium text-slate-400">units</span></div>
          <div className="text-[10px] text-slate-400 mt-0.5 italic">Range: {range[0]} - {range[1]}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volatility Index</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            volatility_index < 0.2 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          }`}>
            {volatility_index < 0.2 ? "STABLE" : "VOLATILE"}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              volatility_index < 0.2 ? "bg-green-500" : "bg-amber-500"
            }`}
            style={{ width: `${Math.min(volatility_index * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-[10px] text-slate-400 italic">
          Calculated over a {forecast_horizon}-day predictive horizon using Ensemble Prophet/LSTM logic.
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Predictive Insights</div>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-slate-600">
            <span className="text-blue-500 font-bold">→</span>
            <span>Ensemble model detects a {volatility_index > 0.3 ? "significant" : "minor"} trend shift in the next cycle.</span>
          </li>
          <li className="flex items-start gap-2 text-xs text-slate-600">
            <span className="text-blue-500 font-bold">→</span>
            <span>Demand seasonality accounted for in the {forecast_horizon}-day window.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
