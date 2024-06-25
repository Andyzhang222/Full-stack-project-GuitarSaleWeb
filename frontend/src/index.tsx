import React from 'react';
import { createRoot } from 'react-dom/client';
import awsconfig from './aws-exports';
import App from './App';
import './index.css';

// 使用全局变量 window.Amplify
document.addEventListener('DOMContentLoaded', function() {
  if (window.Amplify) {
    const Amplify = window.Amplify;
    Amplify.configure(awsconfig);
    console.log('Amplify configured in index.tsx');
  } else {
    console.error('Failed to load AWS Amplify in index.tsx');
  }
});

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}