import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        size?: 'normal' | 'compact';
        theme?: 'light' | 'dark';
      }) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

interface PhoneCallbackScreenProps {
  step: number;
  title: string;
  subtext?: string;
  label: string;
  helperText?: string;
  dayLabel: string;
  timeLabel: string;
  buttonEmpty: string;
  buttonFilled: string;
  dayOptions: string[];
  timeOptions: string[];
  onSubmit: (phone: string, preferredDay?: string, preferredTime?: string, recaptchaToken?: string | null) => void;
  onBack: () => void;
  heroImage?: string;
}

export const PhoneCallbackScreen = ({
  step,
  title,
  subtext,
  label,
  helperText,
  dayLabel,
  timeLabel,
  buttonEmpty,
  buttonFilled,
  dayOptions,
  timeOptions,
  onSubmit,
  onBack,
  heroImage,
}: PhoneCallbackScreenProps) => {
  const [phone, setPhone] = useState<string>("");
  const [preferredDay, setPreferredDay] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaWidgetId = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  const handleRecaptchaCallback = (token: string) => {
    console.log('reCAPTCHA token received:', token ? `${token.substring(0, 20)}...` : 'null');
    setRecaptchaToken(token);
    setError(null);
    
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Geology_onboarding_recaptcha_complete',
      element_type: 'recaptcha',
      step_number: step
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value || "");
    if (value) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'Geology_onboarding_phone_input',
        element_type: 'phone_input',
        step_number: step
      });
    }
  };

  const handleDayChange = (value: string) => {
    setPreferredDay(value);
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Geology_onboarding_preferred_day_select',
      element_type: 'select',
      step_number: step,
      selected_value: value
    });
  };

  const handleTimeChange = (value: string) => {
    setPreferredTime(value);
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Geology_onboarding_preferred_time_select',
      element_type: 'select',
      step_number: step,
      selected_value: value
    });
  };

  const handleBackClick = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Geology_onboarding_back_button',
      element_type: 'button',
      step_number: step,
      page_section: 'phone_callback_screen'
    });
    onBack();
  };

  // Load reCAPTCHA script immediately
  useEffect(() => {
    if (!recaptchaLoaded) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [recaptchaLoaded]);

  // Render reCAPTCHA when script loads
  useEffect(() => {
    if (!recaptchaContainerRef.current || !window.grecaptcha || !recaptchaLoaded) {
      return;
    }

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

    window.grecaptcha.ready(() => {
      if (!recaptchaContainerRef.current) return;

      try {
        // If widget already exists, just reset it
        if (recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
          setRecaptchaToken(null);
          return;
        }

        // Render new widget
        const widgetId = window.grecaptcha.render(recaptchaContainerRef.current, {
          sitekey: siteKey,
          callback: handleRecaptchaCallback,
          'error-callback': () => {
            console.error('reCAPTCHA error callback triggered');
            setRecaptchaToken(null);
          },
          size: 'normal',
          theme: 'light',
        });
        recaptchaWidgetId.current = widgetId;
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
      }
    });
  }, [recaptchaLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    // Check reCAPTCHA before allowing submission
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification");
      return;
    }

    // Get fresh token right before submission (reCAPTCHA tokens can expire)
    if (recaptchaWidgetId.current !== null && window.grecaptcha) {
      try {
        const freshToken = window.grecaptcha.getResponse(recaptchaWidgetId.current);
        if (freshToken) {
          console.log('Using fresh reCAPTCHA token for submission');
          setError(null);
          
          // Track submission
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: phone ? 'Geology_onboarding_phone_submit' : 'Geology_onboarding_phone_skip',
            element_type: 'button',
            step_number: step,
            has_phone: !!phone,
            has_preferred_day: !!preferredDay,
            has_preferred_time: !!preferredTime,
            button_text: phone ? buttonFilled : buttonEmpty
          });
          
          // Allow skipping if no phone entered
          if (!phone) {
            onSubmit("", undefined, undefined, freshToken);
            return;
          }
          // Submit with phone and preferences
          onSubmit(phone, preferredDay, preferredTime, freshToken);
          return;
        } else {
          // Token might have expired, reset and ask user to complete again
          setError("reCAPTCHA token expired. Please complete the verification again.");
          window.grecaptcha.reset(recaptchaWidgetId.current);
          setRecaptchaToken(null);
          return;
        }
      } catch (error) {
        console.error('Error getting reCAPTCHA response:', error);
        setError("Please complete the reCAPTCHA verification");
        return;
      }
    }
  };

  const hasPhone = phone && phone.length > 0;

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 animate-fade-in">
      {heroImage && (
        <div className="mb-2 md:mb-4 pt-4 md:pt-6">
          <img 
            src={heroImage} 
            alt="Callback option" 
            className="w-full h-auto max-h-[30vh] md:max-h-[35vh] object-cover rounded-2xl shadow-lg"
            loading="eager"
          />
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-4 md:mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              {title}
            </h2>
            {subtext && (
              <p className="text-sm text-muted-foreground mb-6">
                {subtext}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                {label} <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <div className="phone-input-wrapper">
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  placeholder={label}
                />
              </div>
              {helperText && (
                <p className="text-xs text-muted-foreground mt-1">
                  {helperText}
                </p>
              )}
            </div>

            {hasPhone && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferred-day" className="text-sm font-medium text-foreground">
                      {dayLabel}
                    </Label>
                    <Select value={preferredDay} onValueChange={handleDayChange}>
                      <SelectTrigger id="preferred-day">
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                      <SelectContent>
                        {dayOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferred-time" className="text-sm font-medium text-foreground">
                      {timeLabel}
                    </Label>
                    <Select value={preferredTime} onValueChange={handleTimeChange}>
                      <SelectTrigger id="preferred-time">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* reCAPTCHA Container */}
          <div className="flex justify-center my-3 min-h-[78px]">
            <div 
              ref={recaptchaContainerRef}
              id={`recaptcha-container-${step}`}
              className="inline-block"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center px-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBackClick}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button 
              type="submit" 
              size="lg"
              disabled={!recaptchaToken}
            >
              {hasPhone ? buttonFilled : buttonEmpty}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
