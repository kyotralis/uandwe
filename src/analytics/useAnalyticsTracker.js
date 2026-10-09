import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './AnalyticsProvider';

export function useAnalyticsTracker() {
  const location = useLocation();
  const { trackEvent } = useAnalytics();
  
  const currentPath = useRef(location.pathname);
  const startTime = useRef(Date.now());
  const previousPath = useRef(null);

  useEffect(() => {
    // Skip tracking for admin routes
    if (location.pathname.startsWith('/admin')) return;

    // If the path actually changed
    if (currentPath.current !== location.pathname) {
      const duration = Date.now() - startTime.current;
      
      // Track exit for the previous page
      trackEvent('PAGE_EXIT', {
        page_url: currentPath.current,
        duration,
        previous_page: previousPath.current
      });
      
      previousPath.current = currentPath.current;
      currentPath.current = location.pathname;
      startTime.current = Date.now();
    }
    
    // Track page view for the current page
    trackEvent('PAGE_VIEW', {
      page_url: currentPath.current,
      page_title: document.title,
      previous_page: previousPath.current
    });
    
  }, [location.pathname, trackEvent]);
}
