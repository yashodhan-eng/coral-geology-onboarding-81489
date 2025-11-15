export const config = {
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787',
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6Lcnpv4rAAAAAOGN8RszPxz9mpL94Ql4FersrRc7',
  mixpanelToken: import.meta.env.VITE_MIXPANEL_TOKEN || 'c72bd1ecb2886bd2e9e755fb6e41acf3',
  redirectBaseUrl: import.meta.env.VITE_REDIRECT_BASE_URL || 'https://preprod.coralacademy.com',
} as const;
