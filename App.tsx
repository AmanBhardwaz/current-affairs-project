
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppData, Category, ViewMode, HistoryData } from './types';
import { INITIAL_DATA } from './constants';
import { generateLatestContent } from './services/geminiService';
import { getRemoteDailyData, saveRemoteDailyData, getRecentHistory } from './services/firebaseService';
import NewsView from './components/NewsView';
import QuizView from './components/QuizView';
import HomeView from './components/HomeView';

const HISTORY_KEY = 'educurrent_history_v1';
const MAX_HISTORY_DAYS = 7;

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryData>({});
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('india');
  const [isLoading, setIsLoading] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTodayKey = () => new Date().toISOString().split('T')[0];

  // Initial Load: Merge Local Cache + Fetch Recent History from Firebase
  useEffect(() => {
    const initApp = async () => {
      setIsCloudSyncing(true);
      const saved = localStorage.getItem(HISTORY_KEY);
      let initialHistory: HistoryData = {};
      if (saved) {
        try {
          initialHistory = JSON.parse(saved);
          setHistory(initialHistory);
        } catch (e) {
          console.error("Failed to parse local history", e);
        }
      }
      try {
        const remoteHistory = await getRecentHistory(MAX_HISTORY_DAYS);
        const mergedHistory = { ...initialHistory, ...remoteHistory };
        setHistory(mergedHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(mergedHistory));
      } catch (err) {
        console.warn("Could not fetch remote history.");
      } finally {
        setIsCloudSyncing(false);
      }
    };
    initApp();
  }, []);

  const performCentralizedUpdate = useCallback(async (dateKey: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const checkAgain = await getRemoteDailyData(dateKey);
      if (checkAgain) {
        setHistory(prev => ({ ...prev, [dateKey]: checkAgain }));
        return;
      }
      const freshData = await generateLatestContent();
      await saveRemoteDailyData(dateKey, freshData);
      setHistory(prev => {
        const newHistory = { ...prev, [dateKey]: freshData };
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (err) {
      console.error("Sync error:", err);
      setError("Sync failed.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const todayKey = getTodayKey();
      const isPast6PM = now.getHours() >= 18;
      if (isPast6PM && !history[todayKey] && !isLoading) {
        performCentralizedUpdate(todayKey);
      }
      return setTimeout(checkSchedule, 60000);
    };
    const timerId = checkSchedule();
    return () => clearTimeout(timerId);
  }, [history, isLoading, performCentralizedUpdate]);

  const dateList = useMemo(() => {
    return Array.from({ length: MAX_HISTORY_DAYS }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const label = i === 0 ? "Today" : i === 1 ? "Yesterday" : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      return { key, label, dayName: d.toLocaleDateString('en-IN', { weekday: 'short' }) };
    });
  }, []);

  const currentData = history[selectedDate];
  const isDataMissing = !currentData;
  const isSelectedDateToday = selectedDate === getTodayKey();
  const isWaitingFor6PM = isSelectedDateToday && new Date().getHours() < 18;

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'bihar', label: 'Bihar', icon: 'fa-location-dot' },
    { id: 'india', label: 'National', icon: 'fa-flag' },
    { id: 'international', label: 'Global', icon: 'fa-globe' }
  ];

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      {isLoading && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md z-[100] flex items-center justify-center">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-sm animate-bounceIn border border-blue-100">
            <div className="relative w-20 h-20 mx-auto mb-6">
               <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                  <i className="fas fa-cloud-upload-alt text-2xl"></i>
               </div>
            </div>
            <h3 className="font-bold text-2xl text-gray-900">Syncing Cloud</h3>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">Preparing today's official 18:00 release for all students...</p>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setViewMode('home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="text-left">
              <h1 className="font-bold text-lg text-gray-900 leading-none">EduCurrent</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[9px] uppercase font-bold text-blue-500 tracking-wider">Official Portal</p>
                {isCloudSyncing && <i className="fas fa-sync fa-spin text-[8px] text-blue-400"></i>}
              </div>
            </div>
          </button>

          <nav className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setViewMode('home')} className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${viewMode === 'home' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>Home</button>
            <button onClick={() => setViewMode('news')} className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${viewMode === 'news' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>News</button>
            <button onClick={() => setViewMode('quiz')} className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${viewMode === 'quiz' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>Quizzes</button>
          </nav>
        </div>

        {viewMode !== 'home' && (
          <div className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
            <div className="max-w-6xl mx-auto px-4 flex gap-4 py-3">
              {dateList.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setSelectedDate(d.key)}
                  className={`flex-shrink-0 flex flex-col items-center min-w-[75px] py-2 px-3 rounded-2xl border-2 transition-all ${
                    selectedDate === d.key 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                      : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase opacity-60">{d.dayName}</span>
                  <span className="text-sm font-bold">{d.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {viewMode === 'home' ? (
          <HomeView 
            onStart={(mode) => setViewMode(mode)} 
            isTodayLive={!!history[getTodayKey()]} 
            activeStudents={12450}
          />
        ) : (
          <>
            <div className="flex justify-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    activeCategory === cat.id 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                      : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'
                  }`}
                >
                  <i className={`fas ${cat.icon} text-xs`}></i>
                  {cat.label}
                </button>
              ))}
            </div>

            {isDataMissing ? (
              <div className="bg-white rounded-[2.5rem] p-16 text-center border border-dashed border-gray-300 shadow-sm">
                 <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-500 text-4xl">
                    {isWaitingFor6PM ? <i className="fas fa-hourglass-start animate-pulse"></i> : <i className="fas fa-folder-open opacity-40"></i>}
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {isWaitingFor6PM ? "Today's Content in Preparation" : "No Archive Found"}
                 </h2>
                 <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                    {isWaitingFor6PM 
                      ? "Every day at 18:00 IST, we release verified news and quizzes. Browse previous dates or check back later." 
                      : "We don't have records for this specific date in our cloud repository."}
                 </p>
              </div>
            ) : (
              <div className="animate-fadeIn min-h-[500px]">
                 <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      {viewMode === 'news' ? 'Verified News' : 'Revision Quiz'}
                      <span className="text-sm font-medium text-gray-400 border-l border-gray-200 pl-3">{selectedDate}</span>
                    </h2>
                    <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold flex items-center gap-2">
                       <i className="fas fa-shield-alt"></i> CLOUD SYNCED
                    </span>
                 </div>
                {viewMode === 'news' ? (
                  <NewsView news={currentData.newsSection[activeCategory]} category={activeCategory} />
                ) : (
                  <QuizView quizSet={currentData.quizSets[activeCategory]} category={activeCategory} />
                )}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-20 border-t border-gray-200 py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Official Central Exam Repository</p>
          <div className="flex justify-center gap-4 text-gray-300">
             <i className="fas fa-check-circle"></i>
             <i className="fas fa-cloud"></i>
             <i className="fas fa-lock"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
