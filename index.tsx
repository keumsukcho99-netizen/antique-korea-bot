
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("%c[Antique-Korea] 시스템 엔진 부팅 시작...", "color: #b8860b; font-weight: bold;");

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log("%c[Antique-Korea] 메인 인터페이스 로드 완료", "color: #2d5a4c; font-weight: bold;");
    } catch (error) {
      console.error("[Antique-Korea] 렌더링 중 치명적 오류:", error);
      rootElement.innerHTML = `
        <div style="color: #b8860b; padding: 40px; text-align: center; font-family: serif;">
          <h2 style="font-size: 24px;">시스템 로드 오류</h2>
          <p style="color: #666; margin-top: 10px;">라이브러리 연결이 원활하지 않습니다. 잠시 후 새로고침(F5) 해주세요.</p>
        </div>
      `;
    }
  }
};

// DOM이 준비되었는지 확인 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
