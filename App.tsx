import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ArtifactUploader from './components/ArtifactUploader';
import ResultDisplay from './components/ResultDisplay';
import DisclaimerModal from './components/DisclaimerModal';
import { AppraisalResult, ViewState, AppraisalConfig } from './types';
import { analyzeArtifact } from './services/geminiService';
import { CloudSync, Coffee, Moon, ExternalLink, Sparkles } from 'lucide-react';

const DAILY_LIMIT = 3;

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [results, setResults] = useState<AppraisalResult[]>([]);
  const [currentResult, setCurrentResult] = useState<AppraisalResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAgreed, setHasAgreed] = useState<boolean>(false);
  const [dailyCount, setDailyCount] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('appraisal_history');
    if (saved) setResults(JSON.parse(saved));
    if (localStorage.getItem('user_has_agreed_disclaimer') === 'true') setHasAgreed(true);
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem('last_appraisal_date');
    if (lastDate !== today) {
      localStorage.setItem('last_appraisal_date', today);
      localStorage.setItem('daily_appraisal_count', '0');
      setDailyCount(0);
    } else {
      setDailyCount(parseInt(localStorage.getItem('daily_appraisal_count') || '0'));
    }
  }, []);

  const handleAnalyze = async (images: string[], config: AppraisalConfig) => {
    if (dailyCount >= DAILY_LIMIT) {
      alert("일일 고증 한도를 초과했습니다.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await analyzeArtifact(images, config);
      setCurrentResult(result);
      const newCount = dailyCount + 1;
      setDailyCount(newCount);
      localStorage.setItem('daily_appraisal_count', newCount.toString());
      setResults(prev => [result, ...prev]);
      setActiveView('result');
    } catch (error) {
      console.error(error);
      alert("고증 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-20 py-10 px-6 animate-fadeIn">
      <section className="max-w-4xl mx-auto space-y-8 pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500/10 rounded-full text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
          <CloudSync size={12} /> Domain Migration in Progress
        </div>
        <h2 className="text-5xl md:text-7xl font-serif-kr font-black text-white leading-tight">
          공간을 정리하고 <br />
          <span className="text-gold-gradient">시간을 정돈하고 있습니다.</span>
        </h2>
        <p className="text-gray-400 font-serif-kr text-xl italic opacity-90 max-w-2xl">
          antique-korea.com의 새 단장을 위해 내부 정리가 진행 중입니다. 잠시 쉬어가는 공간을 마련했습니다.
        </p>
      </section>

      <section className="max-w-5xl mx-auto">
        <a 
          href="https://blog.naver.com/keumsukcho" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative block bg-black border-2 border-[#b8860b]/30 p-12 md:p-20 rounded-[64px] hover:border-[#b8860b] transition-all group overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
            <Coffee size={200} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#b8860b]/10 rounded-full text-[#b8860b] text-xs font-black uppercase tracking-widest">
                <Moon size={14} /> Temporary Resting Place
              </div>
              <h3 className="text-4xl md:text-6xl font-serif-kr font-black text-white">
                "정리가 끝날 때까지 <br /> 
                <span className="text-[#b8860b]">수집가의 사랑방</span>에서."
              </h3>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-[#b8860b] rounded-full flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-transform">
                <Coffee size={40} />
              </div>
              <span className="bg-white text-black px-8 py-4 rounded-2xl font-black font-serif-kr flex items-center gap-3">
                사랑방 입장 <ExternalLink size={20} />
              </span>
            </div>
          </div>
        </a>
      </section>

      <section className="text-center space-y-8 pt-20 border-t border-white/5 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#2d5a4c]/10 rounded-full text-[#2d5a4c] text-xs font-serif-kr font-black tracking-widest border border-[#2d5a4c]/30">
          <Sparkles size={14} /> Antique-Korea.com 고증 엔진 (Daily {dailyCount}/{DAILY_LIMIT})
        </div>
        <ArtifactUploader onAnalyze={handleAnalyze} isLoading={isLoading} dailyCount={dailyCount} dailyLimit={DAILY_LIMIT} />
      </section>
    </div>
  );

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      {!hasAgreed && <DisclaimerModal onAgree={() => { localStorage.setItem('user_has_agreed_disclaimer', 'true'); setHasAgreed(true); }} />}
      {activeView === 'result' && currentResult ? (
        <ResultDisplay result={currentResult} onReset={() => setActiveView('home')} />
      ) : (
        renderHome()
      )}
    </Layout>
  );
};

export default App;
