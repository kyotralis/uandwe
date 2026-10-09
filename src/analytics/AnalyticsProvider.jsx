import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { getSessionId, detectBrowser, detectOS, detectDevice } from './utils';

const AnalyticsContext = createContext();

const API_URL = 'http://localhost:5001/api/analytics';

export const AnalyticsProvider = ({ children }) => {
  const sessionId = getSessionId();

  const trackEvent = useCallback((eventType, payload = {}) => {
    const eventData = {
      session_id: sessionId,
      event_type: eventType,
      timestamp: new Date().toISOString(),
      browser: detectBrowser(),
      os: detectOS(),
      device_type: detectDevice(),
      ...payload
    };

    if (eventType === 'PAGE_EXIT' || eventType === 'SESSION_END') {
      // Use sendBeacon for reliable delivery on exit
      navigator.sendBeacon(`${API_URL}/event`, JSON.stringify(eventData));
    } else {
      fetch(`${API_URL}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      }).catch(err => console.error('Analytics tracking failed', err));
    }
  }, [sessionId]);

  useEffect(() => {
    // Do not track admin routes
    if (window.location.pathname.startsWith('/admin')) return;

    // Only track SESSION_START if this tab hasn't already started one
    if (!sessionStorage.getItem('uandwe_active_session')) {
      trackEvent('SESSION_START', { page_url: window.location.pathname });
      sessionStorage.setItem('uandwe_active_session', 'true');
    }
    
    const handleBeforeUnload = () => {
      // Clean up session if the window is closed
      sessionStorage.removeItem('uandwe_active_session');
      trackEvent('SESSION_END', { page_url: window.location.pathname });
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [trackEvent]);

  return (
    <AnalyticsContext.Provider value={{ trackEvent, sessionId }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
