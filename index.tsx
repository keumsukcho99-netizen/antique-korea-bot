import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Antique Korea Engine Starting...");

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    
    // 앱이 로드되면 로딩 화면 제거
    window.addEventListener('load', () => {
        const loader = document.getElementById('initial-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 500);
        }
    });

    // 렌더링 직후에도 한 번 더 확인 (load 이벤트가 이미 지났을 경우 대비)
    setTimeout(() => {
        const loader = document.getElementById('initial-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 2000); // 최대 2초 대기 후 강제 제거
}
