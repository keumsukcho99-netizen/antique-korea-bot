import React from 'react';
import { Globe, ArrowRight, ShieldCheck, Database, Landmark } from 'lucide-react';

const Library: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto space-y-20 animate-fadeIn">
      <section className="text-center space-y-6">
        <div className="w-24 h-24 bg-[#b8860b] rounded-[32px] flex items-center justify-center mx-auto text-black shadow-3xl mb-8">
          <Globe size={48} />
        </div>
        <h2 className="text-5xl font-serif-kr font-black text-white">Antique-Korea.com <br/> 데이터 이주 센터</h2>
        <p className="text-gray-400 font-serif-kr text-xl leading-relaxed">
          과거의 기록을 미래의 기술로 옮기는 작업이 진행 중입니다. <br/>
          분산되어 있던 고미술 데이터들이 하나의 아카이브로 통합됩니다.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {[
          { 
            title: "데이터 통합 프로토콜", 
            desc: "여러 채널에 흩어져 있던 감정 기록과 학술 자료를 Antique-Korea.com 단일 도메인으로 통합하고 있습니다.",
            icon: Database
          },
          { 
            title: "보안 및 신뢰성 강화", 
            desc: "엄격한 고증 알고리즘 v3.1을 적용하여 위작 판별의 정확도를 높이고 있습니다.",
            icon: ShieldCheck
          },
          { 
            title: "영구적 보존 조치", 
            desc: "사용자께서 기증하신 디지털 데이터는 아카이브 내에서 영구 보존되어 후대의 연구 자료로 활용됩니다.",
            icon: Landmark
          }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[48px] flex items-start gap-8 hover:border-[#b8860b]/40 transition-all">
            <div className="bg-[#b8860b]/10 p-4 rounded-2xl text-[#b8860b]">
              <item.icon size={28} />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-serif-kr font-black text-white">{item.title}</h4>
              <p className="text-gray-500 font-serif-kr leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1405] border-2 border-[#b8860b]/30 p-12 rounded-[56px] text-center space-y-6">
        <p className="text-[#b8860b] font-serif-kr font-black text-xl">"이주는 기술의 변화가 아닌, 기억의 계승입니다."</p>
        <button className="bg-[#b8860b] text-black px-10 py-4 rounded-full font-black font-serif-kr flex items-center gap-3 mx-auto hover:scale-105 transition-transform">
          진행 상황 확인하기 <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Library;
