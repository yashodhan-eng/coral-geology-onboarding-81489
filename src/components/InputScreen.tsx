import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

interface InputScreenProps {
  step: number;
  title: string;
  label: string;
  type: "text" | "email";
  buttonText: string;
  onSubmit: (value: string) => void;
  validator?: (value: string) => string | null;
  onBack?: () => void;
  heroImage?: string;
}

export const InputScreen = ({
  step,
  title,
  label,
  type,
  buttonText,
  onSubmit,
  validator,
  onBack,
  heroImage
}: InputScreenProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      setError(`${label} is required`);
      return;
    }

    if (validator) {
      const validationError = validator(trimmedValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setError(null);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_input_submit',
      step: step,
      input_type: type,
      field_label: label
    });
    onSubmit(trimmedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (touched) {
      setError(null);
    }
  };

  const isDisabled = !value.trim();
  
  const placeholderText = type === "email" ? "Enter your email" : "Enter your name";

  return (
    <div className="animate-fade-in">
      {heroImage && (
        <div className="w-full max-w-[900px] mx-auto px-4 pt-4 md:pt-6">
          <div className="mb-2 md:mb-4">
            <img 
              src={heroImage} 
              alt={`${title} illustration`}
              className="w-full h-auto max-h-[30vh] md:max-h-[35vh] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center px-4">
        {onBack && (
          <button
            onClick={() => {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: 'Geology_onboarding_back_button',
                step: step
              });
              onBack();
            }}
            className="fixed top-[3.75rem] left-4 z-10 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#F05A26' }} />
          </button>
        )}
        <div className="w-full max-w-[360px] md:max-w-[520px] lg:max-w-[640px] space-y-4 md:space-y-6">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
              {title}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="space-y-2">
              <Label htmlFor={`input-${step}`} className="text-sm md:text-base font-medium">
                {label}
              </Label>
              <Input
                id={`input-${step}`}
                type={type}
                value={value}
                onChange={handleChange}
                onFocus={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'Geology_onboarding_input_focus',
                    step: step,
                    input_type: type,
                    field_label: label
                  });
                }}
                onBlur={() => setTouched(true)}
                className="h-12 md:h-13 text-sm md:text-base rounded-full px-5 bg-white border border-gray-300
                         focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder={placeholderText}
                data-step={step}
              />
              {error && touched && (
                <p className="text-sm text-destructive mt-2 px-2">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isDisabled}
              className="w-full h-11 md:h-12 text-sm md:text-base font-semibold rounded-full
                       bg-primary text-primary-foreground 
                       hover:opacity-90 active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200
                       shadow-md hover:shadow-lg"
              data-cta={buttonText.toLowerCase()}
              data-step={step}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
