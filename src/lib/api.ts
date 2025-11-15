// API service for AdCampaigns backend integration
import { config } from '@/config';

const API_BASE_URL = config.apiBaseUrl;

export interface AdCampaignRegisterRequest {
  name: string;
  email: string;
  source: string;
  referrerId?: string | null;
  how_soon?: string | null;
  preferred_topics?: string | null;
  landing_variant?: string | null;
  recaptchaToken: string | null;
}

export interface AdCampaignRegisterResponse {
  success?: boolean;
  id?: string;
  email?: string;
  user_id?: string;
  account_created?: boolean;
  message?: string;
  error?: string;
  duplicate?: boolean;
  error_type?: string;
}

export interface AdCampaignSigninRequest {
  email: string;
  recaptchaToken: string | null;
}

export interface AdCampaignSigninResponse {
  magicLink: any;
  magic_link: any;
  success?: boolean;
  user_id?: string;
  message?: string;
  error?: string;
  error_type?: string;
}

export const adCampaignService = {
  async register(data: AdCampaignRegisterRequest): Promise<AdCampaignRegisterResponse> {
    try {
      // Explicitly construct payload without any UTM parameters
      const payload = {
        name: data.name,
        email: data.email,
        source: data.source,
        referrerId: data.referrerId ?? null,
        how_soon: data.how_soon ?? null,
        preferred_topics: data.preferred_topics ?? null,
        landing_variant: data.landing_variant ?? null,
        recaptchaToken: data.recaptchaToken,
      };

      console.log('API Request URL:', `${API_BASE_URL}/ad-campaigns/register`);
      console.log('API Request Payload:', payload);

      const response = await fetch(`${API_BASE_URL}/ad-campaigns/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Website-Base-URL': window.location.origin,
          'Allow-Analytics-Tracking': 'true',
        },
        body: JSON.stringify(payload),
      });

      console.log('API Response Status:', response.status, response.statusText);

      let result;
      try {
        result = await response.json();
        console.log('API Response Data:', result);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server. Please try again.');
      }

      // Handle 400 Bad Request errors explicitly
      if (!response.ok && response.status === 400) {
        const responseData = result.response || result;
        const errorMessage = responseData.error || 'Bad request. Please check your input.';
        const error = new Error(errorMessage) as any;
        error.errorType = responseData.error_type || 'validation_error';
        error.status = response.status;
        error.error_codes = responseData.error_codes;
        throw error;
      }

      // Handle network errors
      if (!response.ok && response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }

      // Handle response format: { response: {...}, placements: [...] }
      const responseData = result.response || result;

      // Check for errors in response
      if (responseData.error) {
        const errorMessage = responseData.error || 'Registration failed';
        const error = new Error(errorMessage) as any;
        error.errorType = responseData.error_type || 'unknown';
        error.status = response.status;
        throw error;
      }

      // Handle duplicate email - throw error so frontend can handle it
      if (responseData.duplicate || responseData.message === 'Email already registered') {
        const error = new Error('Email already registered') as any;
        error.errorType = 'duplicate_email';
        error.duplicate = true;
        throw error;
      }

      // Success response
      if (responseData.success !== false) {
        return responseData;
      }

      // Fallback error
      throw new Error(responseData.error || 'Registration failed');
    } catch (error: any) {
      // Re-throw if it's already an Error with message
      if (error instanceof Error) {
        throw error;
      }
      // Handle network errors
      if (error.name === 'TypeError' || error.message?.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw new Error(error.message || 'An unexpected error occurred. Please try again.');
    }
  },

  async signin(
    data: AdCampaignSigninRequest
  ): Promise<AdCampaignSigninResponse> {
    try {
      const redirectTo =
        import.meta.env.VITE_APP_ENV === "development"
          ? "https://www.preprod.coralacademy.com/class/lorem-epsum-cbdc05bd-eaf6-4b4f-b753-698b7a916dbf"
          : "https://www.coralacademy.com/class/scalesandslime-d8a4adf3-941f-4944-b278-378544601ecc";
      const payload = {
        email: data.email,
        redirectTo: redirectTo,
        autoRedirect: true,
        source: "MBS_Class_Page",
      };

      console.log(
        "API Signin Request URL:",
        `${API_BASE_URL}/ad-campaigns/signin`
      );
      console.log("API Signin Request Payload:", payload);

      const response = await fetch(`${API_BASE_URL}/sign-in-noOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Website-Base-URL": window.location.origin,
          "Allow-Analytics-Tracking": "true",
        },
        body: JSON.stringify(payload),
      });

      console.log(
        "API Signin Response Status:",
        response.status,
        response.statusText
      );

      let result;
      try {
        result = await response.json();
        console.log("API Signin Response Data:", result);
      } catch (parseError) {
        console.error("Failed to parse signin response:", parseError);
        throw new Error("Invalid response from server. Please try again.");
      }

      // Handle 400 Bad Request errors explicitly
      if (!response.ok && response.status === 400) {
        const responseData = result.response || result;
        const errorMessage =
          responseData.error || "Bad request. Please check your input.";
        const error = new Error(errorMessage) as any;
        error.errorType = responseData.error_type || "validation_error";
        error.status = response.status;
        error.error_codes = responseData.error_codes;
        throw error;
      }

      // Handle network errors
      if (!response.ok && response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }

      // Handle response format: { response: {...} }
      const responseData = result.response || result;

      // Check for errors in response
      if (responseData.error) {
        const errorMessage = responseData.error || "Signin failed";
        const error = new Error(errorMessage) as any;
        error.errorType = responseData.error_type || "unknown";
        error.status = response.status;
        throw error;
      }

      // Success response
      if (responseData.success !== false) {
        return responseData;
      }
      
      return responseData;
      // Fallback error
      throw new Error(responseData.error || "Signin failed");
    } catch (error: any) {
      // Re-throw if it's already an Error with message
      if (error instanceof Error) {
        throw error;
      }
      // Handle network errors
      if (error.name === "TypeError" || error.message?.includes("fetch")) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      }
      throw new Error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  },
};

