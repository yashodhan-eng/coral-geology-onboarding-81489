import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { LandingScreen } from "@/components/LandingScreen";
import { QuestionScreen } from "@/components/QuestionScreen";
import { MultiSelectScreen } from "@/components/MultiSelectScreen";
import { InputScreen } from "@/components/InputScreen";
import { PhoneCallbackScreen } from "@/components/PhoneCallbackScreen";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { BackgroundTheme } from "@/components/BackgroundTheme";
import { contentSchema, OnboardingAnswers } from "@/data/contentSchema";
import { adCampaignService } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import q1Hero from "@/assets/mbs-hero.jpg";
import screen2Hero from "@/assets/mbs-hero-2.jpg";
import screen4Hero from "@/assets/mbs-hero-3.jpg";
import screen5Hero from "@/assets/mbs-hero-4.jpg";
import { trackPageView, trackEvent, trackButtonClick, trackFormEvent, identifyUser } from "@/lib/mixpanel";
import { config } from "@/config";

const STORAGE_KEY = "coralOnboardingAnswers";
const SUBMISSION_KEY = "coralOnboardingSubmission";

const emailValidator = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

// Map quiz answers to backend format
const mapHowSoon = (answer: string): string => {
  const mapping: Record<string, string> = {
    'Right away': 'Right Away',
    'In 1–2 weeks': '1-2 Weeks',
    'Next month': 'next month',
    'Just exploring': 'just exploring'
  };
  return mapping[answer] || answer;
};

const mapSchoolingMode = (answer: string): string => {
  const mapping: Record<string, string> = {
    'Public/Private schooling': 'Public/private schooling',
    'Homeschooling': 'homeschooling'
  };
  return mapping[answer] || answer;
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [trackingParams, setTrackingParams] = useState({ source: '', referrerId: '' });
  
   // Track page view on mount
  useEffect(() => {
    trackPageView("Home Page", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, []);

  // Track step progression
  useEffect(() => {
    if (currentStep > 0) {
      trackEvent("Step Viewed", {
        step: currentStep,
        total_steps: 4,
        has_answers: Object.keys(answers).length > 0,
      });
    }
  }, [currentStep]);


  // Enable scroll tracking
  useScrollTracking();

  // Clear storage and start fresh for preview, capture tracking params
  useEffect(() => {
    localStorage.removeItem(SUBMISSION_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(0);
    setAnswers({});
    setIsSubmitted(false);
    
    // Capture tracking parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    setTrackingParams({
      source: urlParams.get('source') || 'meta_ads',
      referrerId: urlParams.get('referrerId') || ''
    });
    
    // Track page view
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_page_view',
      page_url: window.location.href,
      source: urlParams.get('source') || 'meta_ads'
    });
    if (window.clarity) window.clarity('event', 'Geology_onboarding_page_view');
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  const handleQuestionSelect = (questionKey: string, value: string) => {
    const newAnswers = { ...answers, [questionKey]: value };
    setAnswers(newAnswers);

    // Track question selection
    trackEvent("Question Answered", {
      question_key: questionKey,
      question_value: value,
      step: currentStep,
      total_answers: Object.keys(newAnswers).length,
    });

    
    // Track step completion
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_step_complete',
      step: currentStep,
      step_type: 'question',
      question_key: questionKey,
      answer: value
    });
    if (window.clarity) window.clarity('event', 'Geology_onboarding_step_complete');
    
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 200);
  };

  const handleMultiSelect = (questionKey: string, values: string[]) => {
    const newAnswers = { ...answers, [questionKey]: values.join(', ') };
    setAnswers(newAnswers);
    
    // Track multi-select question
    trackEvent("Question Answered", {
      question_key: questionKey,
      question_values: values,
      question_value: values.join(', '),
      step: currentStep,
      total_answers: Object.keys(newAnswers).length,
      selection_count: values.length,
    });

    // Track step completion
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_step_complete',
      step: currentStep,
      step_type: 'multiselect',
      question_key: questionKey,
      selected_count: values.length,
      answers: values
    });
    if (window.clarity) window.clarity('event', 'Geology_onboarding_step_complete');
    
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 200);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNameSubmit = (name: string) => {
    const newAnswers = { ...answers, name };
    setAnswers(newAnswers);

    // Track name submission
    trackFormEvent("submitted", "name_form", {
      step: 3,
      field_name: "name",
      has_name: !!name,
    });
    
    // Track step completion
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_step_complete',
      step: currentStep,
      step_type: 'name_input'
    });
    if (window.clarity) window.clarity('event', 'Geology_onboarding_step_complete');
    
    setCurrentStep(4);
  };

  const handleEmailSubmit = async (email: string) => {
    const newAnswers = { 
      ...answers, 
      email
    };
    setAnswers(newAnswers);
    
    // Track email form submission started
    trackFormEvent("submitted", "email_form", {
      step: 4,
      field_name: "email",
      has_email: !!email,
      has_recaptcha: !!answers.recaptchaToken,
    });

    // Track step completion
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_step_complete',
      step: currentStep,
      step_type: 'email_input'
    });
    if (window.clarity) window.clarity('event', 'Geology_onboarding_step_complete');
    
    setCurrentStep(5);
  };

  const handlePhoneSubmit = async (phone: string, preferredDay?: string, preferredTime?: string, recaptchaToken?: string | null) => {
    const finalAnswers = { 
      ...answers, 
      phone: phone || undefined,
      preferredDay: preferredDay || undefined,
      preferredTime: preferredTime || undefined,
      recaptchaToken,
      timestamp: Date.now()
    };
    setAnswers(finalAnswers);
    
    // Save submission locally
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(finalAnswers));
    
    // Submit to backend API
    setIsSubmitting(true);
    
    // Track form completion
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_form_complete',
      has_phone: !!phone,
      has_preferred_day: !!preferredDay,
      has_preferred_time: !!preferredTime
    });
    if (window.clarity) window.clarity('event', 'Geology_onboarding_form_complete');
    
    try {
      await submitToBackend(finalAnswers, recaptchaToken);
      // const response = await adCampaignService.signin({ email: finalAnswers.email, recaptchaToken });
      // console.log('Signin response:', response);

      
      // Build redirect URL with all query parameters
      const classId = 'geologybyamalia-047f95a1-a506-421b-8f13-a986ac1eb225';
      const redirectToUrl = `https://www.coralacademy.com/class/${classId}`;
      
      const queryParams = new URLSearchParams({
        name: finalAnswers.name || '',
        email: finalAnswers.email || '',
        source: trackingParams.source,
        ...(trackingParams.referrerId && { referrerId: trackingParams.referrerId }),
        ...(finalAnswers.q1 && { how_soon: mapHowSoon(finalAnswers.q1) }),
        ...(finalAnswers.q2 && { preferred_topics: mapSchoolingMode(finalAnswers.q2) }),
        ...(phone && { phone_number: phone }),
        ...(preferredDay && { preferred_day: preferredDay }),
        ...(preferredTime && { preferred_time: preferredTime }),
        landing_variant: 'GeologyLanding',
        class_id: classId,
        redirectTo: redirectToUrl,
        ...(recaptchaToken && { recaptchaToken }),
        landing_secret: 'ca_landing_2025_3xD9pQ1Z'
      }).toString();
      
      // const finalRedirectUrl = config.appEnv === 'development' 
      //   ? `http://localhost:5173/thank-you-landing?${queryParams}` 
      //   : `https://coralacademy.com/thank-you-landing?${queryParams}`;

      const redirectUrl = `${config.redirectBaseUrl}/thank-you-landing?name=${encodeURIComponent(finalAnswers.name || '')}&email=${encodeURIComponent(finalAnswers.email || '')}&source=${encodeURIComponent(trackingParams.source)}${trackingParams.referrerId ? `&referrerId=${encodeURIComponent(trackingParams.referrerId)}` : ''}${finalAnswers.q1 ? `&how_soon=${encodeURIComponent(mapHowSoon(finalAnswers.q1))}` : ''}${finalAnswers.q2 ? `&preferred_topics=${encodeURIComponent(mapSchoolingMode(finalAnswers.q2))}` : ''}${phone ? `&phone_number=${encodeURIComponent(phone)}` : ''}${preferredDay ? `&preferred_day=${encodeURIComponent(preferredDay)}` : ''}${preferredTime ? `&preferred_time=${encodeURIComponent(preferredTime)}` : ''}&landing_variant=GeologyLanding&class_id=${classId}&redirectTo=${encodeURIComponent(redirectToUrl)}&landing_secret=ca_landing_2025_3xD9pQ1Z${recaptchaToken ? `&recaptchaToken=${encodeURIComponent(recaptchaToken)}` : ''}`;
      console.log('Final redirect URL:', redirectUrl);
      // Track successful signin
        trackEvent("Signin Successful", {
          email: finalAnswers.email,
          user_id: finalAnswers.email,
          has_magic_link: true,
        });
        
        // Track successful completion
        trackEvent("Onboarding Completed", {
          step: 4,
          email: finalAnswers.email,
          has_magic_link: true,
          redirect_url: redirectUrl,
        });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setRedirectUrl(redirectUrl);
      console.log('Redirecting to:', redirectUrl);

      setTimeout(() => {
        
        window.location.href = redirectUrl;
      }, 2500);

      
    } catch (error: any) {
      setIsSubmitting(false);
      console.error('Submission error:', error);
      
      // Show error message
      let errorMessage = 'Registration failed. Please try again.';
      if (error.errorType === 'duplicate_email') {
        errorMessage = 'Email already registered. Please use a different email address.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const submitToBackend = async (finalAnswers: OnboardingAnswers, recaptchaToken?: string | null) => {
    // Validate required fields before sending
    console.log('Final answers before submission:', finalAnswers);
    if (!finalAnswers.name || !finalAnswers.email) {
      throw new Error('Name and email are required');
    }

    if (!recaptchaToken) {
      throw new Error('reCAPTCHA verification is required. Please complete the verification.');
    }

    console.log('Submitting to backend with:', {
      name: finalAnswers.name,
      email: finalAnswers.email,
      source: 'coral_geology_onboarding',
      how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
      preferred_topics: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
      hasRecaptchaToken: !!recaptchaToken,
    });

    // const response = await adCampaignService.register({
    //   name: finalAnswers.name,
    //   email: finalAnswers.email,
    //   source: 'coral_geology_onboarding',
    //   how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
    //   preferred_topics: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
    //   recaptchaToken: recaptchaToken,
    // });

    // Build redirect URL with query parameters
        // const query = new URLSearchParams({
        //   name: finalAnswers.name,
        //     email: finalAnswers.email,
        //   source: 'Landing_Explorer',
        //   referrerId: trackingParams.referrerId,
        //   landing_variant: "GeologyQuizLanding",
        //   redirectTo: config.appEnv === 'development' ? "https://www.preprod.coralacademy.com/browse?utm_source=metaexplorer" : "https://www.coralacademy.com/browse?utm_source=metaexplorer",
        //   recaptchaToken,
        //   landing_secret: "ca_landing_2025_3xD9pQ1Z",
        // }).toString();

        // const redirecturl = `${config.redirectBaseUrl}/thank-you-landing?name=${encodeURIComponent(finalAnswers.name)}&email=${finalAnswers.email}&source=Landing_Explorer&referrerId=${encodeURIComponent(trackingParams.referrerId)}&landing_variant=GeologyQuizLanding&redirectTo=${config.appEnv === 'development' ? 'https://www.preprod.coralacademy.com/class/this-class-will-be-on-zoom-sdk-8f0e37aa-664c-400e-bb6f-3757b27b38e5' : 'https://www.coralacademy.com/class/geologybyamalia-047f95a1-a506-421b-8f13-a986ac1eb225'}&landing_secret=ca_landing_2025_3xD9pQ1Z&recaptchaToken=${encodeURIComponent(recaptchaToken)}`;
        // console.log('Redirect URL:', redirecturl);
      //   setTimeout(() => {

      //   window.location.href = redirecturl;
      // }, 2500);
  };

  if (isSubmitted && redirectUrl) {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundTheme />
        <ThankYouScreen
          title={contentSchema.thankyou.title}
          subtext={contentSchema.thankyou.subtext}
          delayMs={contentSchema.thankyou.delayMs}
          redirectUrl={redirectUrl}
        />
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <BackgroundTheme />
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-primary animate-spin mx-auto" />
          <p className="text-lg text-muted-foreground">Submitting your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundTheme />
      
      {currentStep > 0 && (
        <TopNav 
          currentStep={currentStep} 
          totalSteps={5}
        />
      )}

      <main className="pb-8">
        {currentStep === 0 && (
          <LandingScreen onContinue={() => setCurrentStep(1)} />
        )}

        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="w-full max-w-[900px] mx-auto px-4 pt-4 md:pt-6">
              <div className="mb-2 md:mb-4">
                <img 
                  src={q1Hero} 
                  alt="Parent and child discovering business class" 
                  className="w-full h-auto max-h-[30vh] md:max-h-[35vh] object-cover rounded-2xl shadow-lg"
                  loading="eager"
                />
              </div>
            </div>

            <QuestionScreen
              step={1}
              title={contentSchema.q1.title}
              subtext={contentSchema.q1.subtext}
              options={contentSchema.q1.options}
              onSelect={(option, index) => handleQuestionSelect("q1", option)}
              onBack={handleBack}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="w-full max-w-[900px] mx-auto px-4 pt-4 md:pt-6">
              <div className="mb-2 md:mb-4">
                <img 
                  src={screen2Hero} 
                  alt="Kids learning about business" 
                  className="w-full h-auto max-h-[30vh] md:max-h-[35vh] object-cover rounded-2xl shadow-lg"
                  loading="eager"
                />
              </div>
            </div>

            <MultiSelectScreen
              step={2}
              title={contentSchema.q2.title}
              subtext={contentSchema.q2.subtext}
              options={contentSchema.q2.options}
              onSubmit={(selectedOptions) => handleMultiSelect("q2", selectedOptions)}
              onBack={handleBack}
            />
          </div>
        )}

        {currentStep === 3 && (
          <InputScreen
            step={3}
            title={contentSchema.name.title}
            label={contentSchema.name.label}
            type="text"
            buttonText={contentSchema.name.button}
            onSubmit={handleNameSubmit}
            onBack={handleBack}
            heroImage={screen4Hero}
          />
        )}

        {currentStep === 4 && (
          <InputScreen
            step={4}
            title={contentSchema.email.title}
            label={contentSchema.email.label}
            type="email"
            buttonText={contentSchema.email.button}
            onSubmit={handleEmailSubmit}
            validator={emailValidator}
            onBack={handleBack}
            heroImage={screen5Hero}
          />
        )}

        {currentStep === 5 && (
          <PhoneCallbackScreen
            step={5}
            title={contentSchema.phone.title}
            subtext={contentSchema.phone.subtext}
            label={contentSchema.phone.label}
            helperText={contentSchema.phone.helperText}
            dayLabel={contentSchema.phone.dayLabel}
            timeLabel={contentSchema.phone.timeLabel}
            buttonEmpty={contentSchema.phone.buttonEmpty}
            buttonFilled={contentSchema.phone.buttonFilled}
            dayOptions={contentSchema.phone.dayOptions}
            timeOptions={contentSchema.phone.timeOptions}
            onSubmit={handlePhoneSubmit}
            onBack={handleBack}
            heroImage={screen5Hero}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
