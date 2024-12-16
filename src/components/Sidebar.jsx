export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900/50 backdrop-blur-md border-r border-white/10 text-white flex flex-col">
      <div className="p-4">
        <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg p-3 flex items-center justify-center border border-blue-500/30 transition-all hover:scale-105">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Mission
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <h2 className="text-xs text-blue-400 font-semibold mb-2">Mission Logs</h2>
          <div className="space-y-1">
            {[
              "Mars Exploration",
              "Deep Space Anomalies",
              "Exoplanet Discovery"
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm group transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs">🚀</span>
                  <span className="text-gray-300 group-hover:text-blue-400">{item}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
