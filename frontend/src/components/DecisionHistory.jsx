import { useEffect, useState } from "react";

export default function DecisionHistory({ refreshKey }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/admin/logs?ts=${Date.now()}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setHistory(data.slice(0, 10)); // Only show last 10
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [refreshKey]);

  if (loading && history.length === 0) {
    return <div className="text-slate-400 animate-pulse text-xs">Synchronizing audit trail...</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="space-y-3">
        {history.length > 0 ? (
          history.map((log, idx) => {
            const isApproved = log.message.includes("APPROVED");
            const isRejected = log.message.includes("REJECTED");
            
            return (
              <div 
                key={idx} 
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 group"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                    {log.message}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    isApproved ? "bg-green-50 border-green-100 text-green-600" : 
                    isRejected ? "bg-red-50 border-red-100 text-red-600" :
                    "bg-slate-50 border-slate-100 text-slate-500"
                  }`}>
                    {isApproved ? "VERIFIED" : isRejected ? "OVERRIDDEN" : "LOGGED"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-xs text-slate-400 italic py-4 text-center">No recent audit logs found.</div>
        )}
      </div>
    </div>
  );
}
