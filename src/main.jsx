import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n'; 
import { AnalyticsProvider } from './analytics/AnalyticsProvider';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </StrictMode>
  </BrowserRouter>
)