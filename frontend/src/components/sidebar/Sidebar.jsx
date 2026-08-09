function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6 text-2xl font-bold text-blue-600">
        MedChain
      </div>

      <nav className="mt-8 space-y-2 px-4">
        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
          Dashboard
        </button>

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
          Medical History
        </button>

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
          Prescriptions
        </button>

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
          Reports
        </button>

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-slate-100">
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;