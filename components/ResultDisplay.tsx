import React, { useState } from 'react';
import { AppraisalResult } from '../types';
import { 
  ShieldAlert, ScrollText, Award, Heart, Sparkles, BookOpen, ExternalLink, CheckCircle2, AlertCircle, History,
  FileSearch, Target, Layers, PenTool, Database
} from 'lucide-react';

interface ResultDisplayProps {
  result: AppraisalResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  const coreItems = [
    { id: 'seal', label: '낙관 및 수결', data: result.coreAnalysis.sealsAndSignatures, icon: PenTool, color: 'text-amber-500' },
    { id: 'history', label: '역사적 가치', data: result.coreAnalysis.historicalValue, icon: History, color: 'text-blue-500' },
    { id: 'academic', label: '학술적 검증', data: result.coreAnalysis.academicVerification, icon: ScrollText, color: 'text-emerald-500' },
    { id: 'material', label: '보관 및 재질', data: result.coreAnalysis.materialAndStorage, icon: Layers, color: 'text-purple-500' },
  ];

  return (
    <div className="p-8 md:p-12 animate-fadeIn space-y-16 pb-44">
      {/* 1. 상단 상태 배너 (엄격 고증 모드 강조) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
        <div className="bg-blue-950/20 border-2 border-blue-400/40 p-6 rounded-[32px] flex items-center gap-6 backdrop-blur-md">
          <div className="bg-blue-600 p-2 rounded-full text-white shadow-lg animate-pulse">
            <Database size={20} />
          </div>
          <div>
            <p className="text-blue-200 text-xs font-serif-kr font-black uppercase tracking-widest">Strict Grounding Mode</p>
            <p className="text-blue-400/80 text-[10px] font-serif-kr">Antique-Korea.com 실시간 데이터와 대조되었습니다.</p>
          </div>
        </div>

        <div className="bg-red-950/20 border-2 border-red-900/40 p-6 rounded-[32px] flex items-center gap-6 backdrop-blur-md">
          <div className="bg-red-600 p-2 rounded-full text-white shadow-lg">
            <ShieldAlert size={20} />
          </div>
          <div>
            <p className="text-red-200 text-xs font-serif-kr font-black uppercase tracking-widest">Cross-Verification</p>
            <p className="text-red-400/80 text-[10px] font-serif-kr">인명, 연호, 시세 데이터가 교차 검증되었습니다.</p>
          </div>
        </div>

        {result.isDonated && (
          <div className="bg-[#1a1405] border-2 border-[#d4af37]/40 p-6 rounded-[32px] flex items-center gap-6">
            <div className="bg-[#d4af37] p-2 rounded-full text-black">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[#d4af37] text-xs font-serif-kr font-black">디지털 아카이브 등재</p>
              <p className="text-gray-500 text-[10px] font-serif-kr italic">"소중한 문화 기록이 보존되었습니다."</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. 메인 고증서 구역 */}
      <div className="flex flex-col lg:flex-row gap-16">
        {/* 왼쪽: 이미지 갤러리 */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="border-[16px] border-[#111] shadow-3xl bg-[#050505] aspect-[4/3] flex items-center justify-center rounded-[56px] overflow-hidden relative group">
            <img 
              src={result.imageUrls[activeImageIndex]} 
              alt={result.title} 
              className="max-w-[92%] max-h-[92%] object-contain relative z-10 drop-shadow-2xl" 
            />
            <div className="absolute top-10 right-10 bg-[#b8860b] text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest z-20 shadow-2xl">
               데이터 정합도 {result.confidenceScore}%
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto py-2 justify-center">
            {result.imageUrls.map((url, idx) => (
              <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`w-24 h-24 rounded-3xl border-2 overflow-hidden transition-all ${activeImageIndex === idx ? 'border-[#d4af37] scale-105 shadow-xl' : 'border-white/5 opacity-30 hover:opacity-100'}`}>
                <img src={url} className="w-full h-full object-cover" alt="Artifact" />
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽: 핵심 고증 보고서 */}
        <div className="w-full lg:w-1/2 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#d4af37] font-black font-serif-kr tracking-widest text-sm uppercase">
               <Award size={20} /> {result.category} · {result.period}
            </div>
            <h2 className="text-6xl font-serif-kr font-black text-white leading-tight tracking-tighter">{result.title}</h2>
          </div>

          {/* 4대 핵심 분석 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreItems.map(item => (
              <div key={item.id} className="bg-white/5 border border-white/10 p-8 rounded-[40px] space-y-4 hover:border-[#b8860b]/40 transition-all group">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-3 ${item.color} font-black font-serif-kr text-xs tracking-widest`}>
                    <item.icon size={18} /> {item.label}
                  </div>
                  <span className="text-gray-600 text-[10px] font-black">{item.data.score}%</span>
                </div>
                <p className="text-gray-300 text-sm font-serif-kr leading-relaxed line-clamp-4 italic">
                  "{item.data.content}"
                </p>
                <div className="pt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${item.color.replace('text-', 'bg-')}`} style={{ width: `${item.data.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* 추정 가치 (현실적 시세 산출 강조) */}
          <div className="bg-gradient-to-r from-[#1a1405] to-black p-10 rounded-[48px] border-2 border-[#b8860b]/30 space-y-4 shadow-3xl">
            <div className="flex justify-between items-center">
              <div className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.2em]">Historical Market Value (Data-Grounded)</div>
              <Sparkles size={16} className="text-[#b8860b] animate-pulse" />
            </div>
            <div className="text-5xl font-serif-kr font-black text-white">
               {formatCurrency(result.estimatedValue.min)} ~ {formatCurrency(result.estimatedValue.max)}
            </div>
            <p className="text-[11px] text-gray-500 font-serif-kr italic">
               * {result.estimatedValue.note}
            </p>
          </div>
        </div>
      </div>

      {/* 3. 인문학적 총평 및 근거 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-[#111] p-12 rounded-[56px] border border-white/5 space-y-8 shadow-2xl">
          <div className="flex items-center gap-4 text-[#d4af37] border-b border-white/10 pb-6">
            <BookOpen size={24} />
            <h4 className="text-2xl font-serif-kr font-black text-white">감정관 고증 총평 (Academic Summary)</h4>
          </div>
          <div className="space-y-6">
            <p className="text-xl text-gray-200 font-serif-kr leading-relaxed font-black italic">
               "{result.analysis.culturalContext || result.description}"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
               <div className="space-y-3">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">이미지 내 텍스트 및 세부 고증</span>
                 <p className="text-sm text-gray-400 font-serif-kr leading-relaxed">{result.analysis.artifactDetails}</p>
               </div>
               <div className="space-y-3">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">보존 상태에 따른 시세 영향</span>
                 <p className="text-sm text-gray-400 font-serif-kr leading-relaxed">{result.analysis.conditionReport}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-12 rounded-[56px] border border-white/5 space-y-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-950/20 border-2 border-yellow-900/40 flex items-center justify-center text-yellow-600 mb-2">
            <AlertCircle size={40} />
          </div>
          <div className="space-y-4">
            <h5 className="text-xl font-serif-kr font-black text-white">학술적 데이터 가이드</h5>
            <p className="text-sm text-gray-400 font-serif-kr leading-relaxed italic">
              "AI는 Antique-Korea.com의 고문헌과 경매 기록을 대조합니다. 그러나 낙관의 미세한 마모나 종이의 결 등 실물의 물리적 한계가 존재하므로, 고가의 거래 시에는 반드시 실물 감정을 권장합니다."
            </p>
          </div>
          <div className="w-full h-px bg-white/5" />
          <div className="flex items-center gap-2 text-[#b8860b] font-black font-serif-kr text-xs">
            Antique-Korea.com 엄격 고증 알고리즘 v3.1 <Sparkles size={14} />
          </div>
        </div>
      </div>

      {/* 4. 참조 문헌 및 하단 액션 */}
      <div className="space-y-12 pt-8">
        {result.groundingSources && result.groundingSources.length > 0 && (
          <div className="space-y-6 text-center">
            <div className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Grounding Evidences (verified via Google Search)</div>
            <div className="flex flex-wrap justify-center gap-4">
              {result.groundingSources.map((source, i) => (
                <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37] transition-all flex items-center gap-2 group">
                  <ExternalLink size={14} className="group-hover:scale-110 transition-transform" /> {source.title}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button onClick={onReset} className="bg-white text-black px-16 py-6 rounded-full font-black text-2xl font-serif-kr hover:bg-[#d4af37] shadow-3xl transition-all border-4 border-[#b8860b]">
            다른 유물 엄격 고증하기
          </button>
          <button className="bg-black text-[#b8860b] px-12 py-6 rounded-full font-black text-xl font-serif-kr border-2 border-[#b8860b]/40 hover:bg-[#b8860b]/10 transition-all flex items-center gap-4 justify-center">
             고증 보고서 아카이빙 <Sparkles size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
