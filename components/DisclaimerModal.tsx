import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Scale, Landmark, Gavel, Heart, FileText } from 'lucide-react';

interface DisclaimerModalProps {
  onAgree: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8">
      {/* 어두운 배경 */}
      <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" />
      
      {/* 팝업 본체 - 더 콤팩트하게 조정 */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border-2 border-[#b8860b] rounded-[48px] shadow-[0_0_100px_rgba(184,134,11,0.3)] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="absolute inset-0 traditional-lattice opacity-5 pointer-events-none" />
        
        {/* 헤더 */}
        <div className="bg-[#111] p-8 border-b border-[#b8860b]/20 text-center relative shrink-0">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full text-[#b8860b] text-[10px] font-black tracking-widest uppercase mb-4">
            <FileText size={14} /> ACCESS PROTOCOL
          </div>
          <h2 className="text-3xl md:text-4xl font-serif-kr font-black text-white tracking-tighter text-center">
            Antique-Korea.com <br />
            <span className="text-gold-gradient">AI 데이터 아카이브 면책 조항</span>
          </h2>
        </div>

        {/* 본문 - 스크롤 가능 영역 최적화 */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 text-gray-300 font-serif-kr leading-relaxed">
          <div className="space-y-4 text-center">
            <p className="text-xl font-bold text-white italic">
              "본 서비스는 학술적 기록 저장소입니다."
            </p>
            <p className="text-sm opacity-60 max-w-xl mx-auto">
              아카이브 입장 전, 아래의 면책 사항을 반드시 확인해 주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-[#b8860b] font-black text-lg">
                <AlertTriangle size={20} /> 1. 기록의 성격
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                제공되는 모든 결과는 Antique-Korea.com의 학술 문헌에 기반한 <b>'학술 기록'</b>입니다. 실제 가치와는 다를 수 있습니다.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-[#b8860b] font-black text-lg">
                <Scale size={20} /> 2. 증명 효력 부재
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                법적 공인 감정서가 아니며, 국가기관 제출용으로 사용할 수 없습니다.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-[#b8860b] font-black text-lg">
                <Gavel size={20} /> 3. 거래 책임 면책
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                분석 결과를 기반으로 한 모든 경제 활동의 책임은 <b>사용자</b>에게 있습니다.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-red-500 font-black text-lg">
                <Landmark size={20} /> 4. 국가유산법 준수
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                도난 및 불법 취득물에 대한 정보 생성 요청을 엄격히 금지합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 푸터 - 더 눈에 띄고 높게 배치 */}
        <div className="bg-[#050505] p-10 md:p-12 border-t border-[#b8860b]/30 shrink-0">
          <div className="flex flex-col items-center gap-8">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-[#b8860b] border-[#b8860b]' : 'border-gray-600 group-hover:border-[#b8860b]'}`}>
                {isChecked && <CheckCircle2 className="text-black" size={20} />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={isChecked} 
                onChange={(e) => setIsChecked(e.target.checked)} 
              />
              <span className={`text-lg md:text-xl font-serif-kr font-black transition-colors ${isChecked ? 'text-white' : 'text-gray-600'}`}>
                위 면책 사항을 숙지하였으며 동의합니다.
              </span>
            </label>

            <button
              onClick={onAgree}
              disabled={!isChecked}
              className={`
                px-16 py-6 rounded-full text-xl md:text-2xl font-black font-serif-kr transition-all border-4
                ${isChecked 
                  ? 'bg-white text-black border-[#b8860b] shadow-[0_15px_40px_rgba(184,134,11,0.4)] hover:scale-105 active:scale-95' 
                  : 'bg-gray-900 text-gray-700 border-transparent cursor-not-allowed'}
              `}
            >
              아카이브 입장하기 (Access)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
