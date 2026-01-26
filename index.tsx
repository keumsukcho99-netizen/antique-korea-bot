import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Antique-Korea App initializing...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found in index.html");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
