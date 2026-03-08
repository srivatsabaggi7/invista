export default function EOQBreakdown({ optimization }) {
  if (!optimization || optimization.status !== "OK") return null;

  const { EOQ, reorder_point, safety_stock, lead_time_days } = optimization.output;
  const { model, service_factor_z } = optimization.metadata;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reorder Point (ROP)</div>
          <div className="text-xl font-black text-slate-800">{reorder_point} <span className="text-[10px] font-medium text-slate-400">units</span></div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Safety Stock</div>
          <div className="text-xl font-black text-slate-800">{safety_stock} <span className="text-[10px] font-medium text-slate-400">units</span></div>
        </div>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Model Parameters</div>
          <div className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">{model}</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Service Level Z-Factor</span>
            <span className="font-bold text-slate-700">{service_factor_z}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Lead Time Protection</span>
            <span className="font-bold text-slate-700">{lead_time_days} days</span>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 leading-relaxed italic border-l-2 border-slate-200 pl-3">
        The ROP calculation ({reorder_point}) ensures zero stockouts during the {lead_time_days}-day replenishment window, 
        maintaining a safety buffer of {safety_stock} units.
      </p>
    </div>
  );
}
