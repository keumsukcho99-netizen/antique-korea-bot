import React from 'react';
import { Heart, Scroll, PenTool, Award, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto space-y-24 animate-fadeIn">
      <section className="space-y-12">
        <div className="space-y-4">
           <h2 className="text-6xl font-serif-kr font-black text-white leading-tight">시간의 가치를 <br/> <span className="text-gold-gradient">다시 묻습니다.</span></h2>
           <p className="text-gray-500 font-serif-kr text-xl">Antique-Korea.com은 수집가의 사랑방에서 시작되었습니다.</p>
        </div>
        
        <div className="prose prose-invert max-w-none font-serif-kr text-gray-300 text-lg leading-loose space-y-8">
          <p>
            우리는 흔히 오래된 물건을 '골동품'이라 부르며 그저 낡은 것으로 치부하곤 합니다. 하지만 그 안에는 이름 모를 도공의 숨결, 선비의 꼿꼿한 필치, 그리고 시대를 관통하는 삶의 지혜가 담겨 있습니다.
          </p>
          <p>
            Antique-Korea.com은 인공지능 기술을 통해 이 숨겨진 가치를 세상 밖으로 끌어올리고자 합니다. 수만 권의 고문헌 데이터와 낙관 아카이브를 학습한 AI 고증 엔진은, 인간의 눈이 놓치기 쉬운 미세한 차이를 포착하여 객관적인 근거를 제시합니다.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#111] p-12 rounded-[56px] space-y-6 border border-white/5">
          <Scroll className="text-[#b8860b]" size={40} />
          <h3 className="text-3xl font-serif-kr font-black text-white">학술적 진실</h3>
          <p className="text-gray-500 font-serif-kr leading-relaxed">단순한 가격 감정을 넘어, 유물이 가진 역사적 맥락과 학술적 위치를 찾아냅니다.</p>
        </div>
        <div className="bg-[#111] p-12 rounded-[56px] space-y-6 border border-white/5">
          <PenTool className="text-[#b8860b]" size={40} />
          <h3 className="text-3xl font-serif-kr font-black text-white">기술의 계승</h3>
          <p className="text-gray-500 font-serif-kr leading-relaxed">전통적 감정법에 현대적 데이터 분석을 더해 더 투명한 유통 문화를 만듭니다.</p>
        </div>
      </div>

      <section className="pt-20 border-t border-white/5 text-center space-y-10">
        <div className="flex justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center text-red-500"><Heart size={24} fill="currentColor" /></div>
        </div>
        <p className="text-gray-400 font-serif-kr text-lg italic">"모든 유물은 누군가의 정성이었고, 누군가의 소중한 기억이었습니다."</p>
        <a href="https://blog.naver.com/keumsukcho" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[#b8860b] font-black font-serif-kr hover:underline">
          제작자 블로그 방문하기 <ExternalLink size={18} />
        </a>
      </section>
    </div>
  );
};

export default About;
