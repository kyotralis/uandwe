export function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getSessionId() {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

export function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Mozilla Firefox';
  } else if (userAgent.indexOf('SamsungBrowser') > -1) {
    browser = 'Samsung Internet';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browser = 'Opera';
  } else if (userAgent.indexOf('Trident') > -1) {
    browser = 'Microsoft Internet Explorer';
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Microsoft Edge';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Google Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Apple Safari';
  }
  return browser;
}

export function detectOS() {
  const userAgent = navigator.userAgent;
  let os = 'Unknown';
  if (userAgent.indexOf('Win') !== -1) os = 'Windows';
  if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
  if (userAgent.indexOf('X11') !== -1) os = 'UNIX';
  if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
  if (/Android/.test(userAgent)) os = 'Android';
  if (/iPhone|iPad|iPod/.test(userAgent)) os = 'iOS';
  return os;
}

export function detectDevice() {
  const userAgent = navigator.userAgent;
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'Mobile';
  }
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'Tablet';
  }
  return 'Desktop';
}
