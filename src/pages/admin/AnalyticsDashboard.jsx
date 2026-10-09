import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5001/api/analytics/dashboard';

export default function AnalyticsDashboard() {
  const [overview, setOverview] = useState(null);
  const [popularPages, setPopularPages] = useState([]);
  const [navigationPaths, setNavigationPaths] = useState([]);
  const [sessionJourneyId, setSessionJourneyId] = useState('');
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [overviewRes, popularRes, navRes] = await Promise.all([
        fetch(`${API_BASE}/overview`),
        fetch(`${API_BASE}/popular-pages`),
        fetch(`${API_BASE}/navigation`)
      ]);
      setOverview(await overviewRes.json());
      setPopularPages(await popularRes.json());
      setNavigationPaths(await navRes.json());
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionJourney = async (e) => {
    e.preventDefault();
    if (!sessionJourneyId) return;
    try {
      const res = await fetch(`${API_BASE}/sessions/${sessionJourneyId}`);
      setJourneyData(await res.json());
    } catch (err) {
      console.error('Failed to fetch session journey', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <p className="text-gray-400">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pt-16 sm:pt-24 pb-8 sm:pb-16 px-4 sm:px-6 md:px-[5%]">
      <div className="w-full mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-neutral-900">Website Analytics</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-2">Monitor your website's traffic and user navigation.</p>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="px-5 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-sm text-gray-300 hover:bg-neutral-100 transition-colors shrink-0"
          >
            Refresh Data
          </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-[#15151e] border border-neutral-200 p-5 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Sessions</h3>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 mt-3">{overview?.totalSessions || 0}</p>
          </div>
          <div className="bg-[#15151e] border border-neutral-200 p-5 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Unique Visitors</h3>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 mt-3">{overview?.totalUsers || 0}</p>
          </div>
          <div className="bg-[#15151e] border border-neutral-200 p-5 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Page Views</h3>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 mt-3">{overview?.totalPageViews || 0}</p>
          </div>
          <div className="bg-[#15151e] border border-neutral-200 p-5 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Avg Time</h3>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 mt-3">{Math.round((overview?.avgDuration || 0) / 1000)}s</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">
          
          {/* Top Pages */}
          <div className="bg-[#15151e] border border-neutral-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="text-base sm:text-lg md:text-xl font-normal tracking-tight text-neutral-900">Top Pages</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-[#1a1a24] text-gray-400 border-b border-neutral-200">
                  <tr>
                    <th className="px-5 py-4 font-medium">URL</th>
                    <th className="px-5 py-4 font-medium">Views</th>
                    <th className="px-5 py-4 font-medium">Time (s)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {popularPages.map((page, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-4 text-gray-200">{page.url}</td>
                      <td className="px-5 py-4 text-gray-400">{page.views}</td>
                      <td className="px-5 py-4 text-gray-500">{Math.round(page.avgDuration / 1000)}</td>
                    </tr>
                  ))}
                  {popularPages.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-5 py-8 text-center text-gray-500">No pages found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Navigation Flow */}
          <div className="bg-[#15151e] border border-neutral-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="text-base sm:text-lg md:text-xl font-normal tracking-tight text-neutral-900">Common Paths</h3>
            </div>
            <div className="p-0 flex-1 overflow-y-auto">
              <ul className="divide-y divide-white/5">
                {navigationPaths.map((path, idx) => (
                  <li key={idx} className="flex justify-between items-center px-5 py-4 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center text-sm md:text-base gap-3">
                      <span className="text-gray-200">{path.from || 'Entry'}</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-orange-400">{path.to}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">{path.count} times</span>
                  </li>
                ))}
                {navigationPaths.length === 0 && (
                  <li className="px-5 py-8 text-center text-gray-500 text-sm md:text-base">No paths found</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Session Trace */}
        <div className="bg-[#15151e] border border-neutral-200 rounded-xl shadow-sm p-5 md:p-8 mt-4">
          <h3 className="text-base sm:text-lg md:text-xl font-normal tracking-tight text-neutral-900 mb-6">Trace Individual Session</h3>
          
          <form onSubmit={fetchSessionJourney} className="flex flex-col sm:flex-row gap-3 max-w-lg mb-8">
            <input 
              type="text" 
              placeholder="Session ID (e.g., sess_abc123)" 
              value={sessionJourneyId} 
              onChange={e => setSessionJourneyId(e.target.value)} 
              className="flex-1 bg-neutral-50 border border-neutral-200 rounded px-4 py-3 text-sm md:text-base text-neutral-900 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button 
              type="submit" 
              disabled={!sessionJourneyId}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-100 disabled:text-gray-500 text-neutral-900 px-6 py-3 rounded text-sm md:text-base transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {journeyData && (
            <div className="border border-neutral-200 rounded p-5 md:p-6 bg-neutral-50">
              <h4 className="text-sm md:text-base font-normal text-gray-300 mb-6">Results for: <span className="text-neutral-900 font-mono bg-white/20 px-2 py-1 rounded">{sessionJourneyId}</span></h4>
              {journeyData.length === 0 ? (
                <p className="text-sm md:text-base text-gray-500">No events found for this ID.</p>
              ) : (
                <div className="space-y-6 border-l border-neutral-300 ml-3 pl-6 relative">
                  {journeyData.map((evt, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-orange-500"></div>
                      <div className="bg-[#1a1a24] border border-white/5 p-4 md:p-5 rounded-xl shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                          <span className="text-xs sm:text-sm font-semibold text-gray-400">{evt.type}</span>
                          <span className="text-xs sm:text-sm text-gray-500">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm md:text-base font-medium text-neutral-900">{evt.url}</p>
                        {evt.duration > 0 && (
                          <p className="text-xs sm:text-sm text-gray-400 mt-2">Duration: {Math.round(evt.duration / 1000)}s</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
