import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("연구소 엔진(index.tsx) 가동 시작...");

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    console.log("연구소 화면 렌더링 완료.");
} else {
    console.error("화면을 그릴 root 엘리먼트를 찾지 못했습니다.");
}
