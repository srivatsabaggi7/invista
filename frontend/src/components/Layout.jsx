import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { label: "Manager Workspace", path: "/", icon: "📊" },
    { label: "Admin Panel", path: "/admin", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">
            INVISTA <span className="text-blue-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            Intelligent Inventory Analytics
          </p>
        </div>

        <nav className="flex-1 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="text-xs text-slate-500 mb-2"></div>
          <div className="text-sm font-medium text-slate-300">
            
          </div>
          <div className="text-xs text-slate-500 mt-1 italic">
            CSE Batch 2022-2026
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-sm text-slate-500">
            {location.pathname === "/" ? "Dashboard / Workspace" : "Settings / Admin Panel"}
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              JD
            </div>
            <div className="text-sm font-medium">John Doe</div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
