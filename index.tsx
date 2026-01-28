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
    
    // 앱이 화면에 그려지면 로딩 화면을 즉시 치웁니다.
    const hideLoader = () => {
        const loader = document.getElementById('initial-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    };

    // 창이 로드되거나, 1.5초가 지나면 무조건 로더를 숨깁니다.
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 1500);
}
