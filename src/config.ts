const isDevelopment = false;

export const config = {
  // Environment mode
  appEnv: isDevelopment ? "development" : "production",

  // API Base URL
  apiBaseUrl: isDevelopment ? "http://api.preprod.coralacademy.com" : "https://api.coralacademy.com", // Update this with your production API URL

  // reCAPTCHA Site Key (public key, safe to expose)
  recaptchaSiteKey: "6Lcnpv4rAAAAAOGN8RszPxz9mpL94Ql4FersrRc7",

  // Mixpanel Token (frontend token, safe to expose)
  mixpanelToken: isDevelopment? "c72bd1ecb2886bd2e9e755fb6e41acf3": "341fbf2060d1c71a4d3c93b49cd31b19",

  // Redirect Base URL
  redirectBaseUrl: isDevelopment ? "https://preprod.coralacademy.com" : "https://www.coralacademy.com", // Update this with your production redirect URL
};
