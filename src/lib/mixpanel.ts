import mixpanel from 'mixpanel-browser';

let isInitialized = false;

// Initialize Mixpanel
export const initMixpanel = () => {
  console.log("initMixpanel")
  const token = import.meta.env.VITE_MIXPANEL_TOKEN;
  
  if (!token) {
    console.warn('Mixpanel token not found. Tracking is disabled.');
    return;
  }

  try {
    mixpanel.init(token, {
      debug: import.meta.env.DEV,
      track_pageview: true, // Automatically track page views
      persistence: 'localStorage',
      ignore_dnt: true,
      record_sessions_percent: 100,
      record_idle_timeout_ms: 1800000,
      api_host: 'https://api.mixpanel.com',
      // Enable session recording for heatmaps (enable in Mixpanel dashboard settings)
      // Session recording must be enabled in your Mixpanel project settings
      loaded: (mixpanel) => {
        // Set default properties for all events
        mixpanel.register({
          app_name: 'Coral BizKid Landing',
          environment: import.meta.env.MODE,
        });
        // Force identify for local sessions (helps replay link sessions)
        mixpanel.identify(mixpanel.get_distinct_id());
        isInitialized = true;
        isInitialized = true;
      },
    });
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Mixpanel:', error);
  }

  return mixpanel;
};

// Check if Mixpanel is initialized
const checkInitialized = () => {
  if (!isInitialized) {
    console.warn('Mixpanel is not initialized. Event not tracked.');
    return false;
  }
  return true;
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!checkInitialized()) return;
  
  try {
    mixpanel.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Mixpanel tracking error:', error);
  }
};

// Track page views
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (!checkInitialized()) return;
  
  try {
    mixpanel.track('Page Viewed', {
      page: pageName,
      ...properties,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Mixpanel page view tracking error:', error);
  }
};

// Identify user (call after form submission)
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  if (!checkInitialized()) return;
  
  try {
    mixpanel.identify(userId);
    if (userProperties) {
      mixpanel.people.set(userProperties);
    }
  } catch (error) {
    console.error('Mixpanel identify error:', error);
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (!checkInitialized()) return;
  
  try {
    mixpanel.people.set(properties);
  } catch (error) {
    console.error('Mixpanel set user properties error:', error);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, properties?: Record<string, any>) => {
  trackEvent('Button Clicked', {
    button_name: buttonName,
    ...properties,
  });
};

// Track form events
export const trackFormEvent = (eventType: 'opened' | 'submitted' | 'field_focused' | 'field_changed', formName: string, properties?: Record<string, any>) => {
  trackEvent(`Form ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`, {
    form_name: formName,
    event_type: eventType,
    ...properties,
  });
};

// Track video events
export const trackVideoEvent = (eventType: 'play' | 'pause' | 'ended', videoName: string, properties?: Record<string, any>) => {
  trackEvent('Video Event', {
    video_name: videoName,
    event_type: eventType,
    ...properties,
  });
};

// Track modal events
export const trackModalEvent = (eventType: 'opened' | 'closed', modalName: string, properties?: Record<string, any>) => {
  trackEvent('Modal Event', {
    modal_name: modalName,
    event_type: eventType,
    ...properties,
  });
};

// Reset user (on logout)
export const resetUser = () => {
  if (!checkInitialized()) return;
  
  try {
    mixpanel.reset();
  } catch (error) {
    console.error('Mixpanel reset error:', error);
  }
};

export default mixpanel;

