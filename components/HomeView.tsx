
import React from 'react';

interface HomeViewProps {
  onStart: (mode: 'news' | 'quiz') => void;
  isTodayLive: boolean;
  activeStudents: number;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart, isTodayLive, activeStudents }) => {
  return (
    <div className="animate-fadeIn space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-400/20 backdrop-blur-md border border-white/10 text-xs font-bold tracking-widest uppercase mb-6">
            <i className="fas fa-bolt mr-2 text-yellow-300"></i> Empowering Aspirants
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Master Today's <br/> <span className="text-blue-200">Current Affairs.</span>
          </h1>
          <p className="text-lg text-blue-100/80 mb-10 leading-relaxed font-medium">
            Daily verified news and interactive quizzes specially curated for BPSC, SSC, and UPSC exams. Released every day at 18:00 IST.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onStart('news')}
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center gap-3"
            >
              <i className="fas fa-newspaper"></i> Read Today's News
            </button>
            <button 
              onClick={() => onStart('quiz')}
              className="bg-blue-500/30 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-500/40 transition-all flex items-center gap-3"
            >
              <i className="fas fa-pen-nib"></i> Attempt Daily Quiz
            </button>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-10 opacity-10 text-[10rem] rotate-12">
          <i className="fas fa-graduation-cap"></i>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 text-xl">
            <i className="fas fa-signal"></i>
          </div>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-1">Today's Status</p>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            {isTodayLive ? 'Data is Live' : 'Release Pending'}
            <span className={`w-2 h-2 rounded-full ${isTodayLive ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
          </h3>
          <p className="text-gray-500 text-sm mt-2">Next refresh: 18:00 IST</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-xl">
            <i className="fas fa-users"></i>
          </div>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-1">Current Reach</p>
          <h3 className="text-xl font-bold text-gray-900">{activeStudents.toLocaleString()}+ Students</h3>
          <p className="text-gray-500 text-sm mt-2">Active across India today</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 text-xl">
            <i className="fas fa-award"></i>
          </div>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-1">Exams Covered</p>
          <h3 className="text-xl font-bold text-gray-900">UPSC, BPSC, SSC</h3>
          <p className="text-gray-500 text-sm mt-2">100% Exam relevant content</p>
        </div>
      </section>

      {/* Why EduCurrent Section */}
      <section className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why trust EduCurrent?</h2>
          <p className="text-slate-400">We solve the problem of "News Overload" for serious aspirants.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-6 items-start p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl">
              <i className="fas fa-check-double"></i>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Zero Fluff Content</h4>
              <p className="text-slate-400 text-sm leading-relaxed">No unnecessary drama or politics. Only factual news points that can actually appear in your exam question paper.</p>
            </div>
          </div>
          
          <div className="flex gap-6 items-start p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl">
              <i className="fas fa-history"></i>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Instant Revision</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Convert your reading into memory instantly with our AI-generated quizzes that test your understanding immediately.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
