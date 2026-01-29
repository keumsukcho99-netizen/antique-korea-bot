
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
    
    // 로딩 화면을 숨기는 함수
    const hideLoader = () => {
        const loader = document.getElementById('initial-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                    console.log("Antique Korea: Heritage Lab Door Opened.");
                }
            }, 500);
        }
    };

    // 앱 로드 시점에 맞춰 안전하게 실행
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
        setTimeout(hideLoader, 1500);
    }
}
