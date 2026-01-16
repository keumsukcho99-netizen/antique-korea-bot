
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("System: Antique Korea Research Lab booting...");

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Critical: Root container not found!");
}
