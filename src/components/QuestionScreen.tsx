import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface QuestionScreenProps {
  step: number;
  title: string;
  subtext?: string;
  options: string[];
  onSelect: (option: string, index: number) => void;
  onBack?: () => void;
}

export const QuestionScreen = ({ 
  step, 
  title, 
  subtext, 
  options, 
  onSelect,
  onBack
}: QuestionScreenProps) => {
  const handleOptionClick = (option: string, index: number) => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Geology_onboarding_question_answer',
      element_type: 'option_button',
      step_number: step,
      question_title: title,
      selected_option: option,
      option_index: index
    });
    onSelect(option, index);
  };

  const handleBackClick = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Geology_onboarding_back_button',
      element_type: 'button',
      step_number: step,
      page_section: 'question_screen'
    });
    onBack?.();
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[50vh] px-4 animate-fade-in pt-2">
      {onBack && (
        <button
          onClick={handleBackClick}
          className="fixed top-[3.75rem] left-4 z-10 p-2 rounded-full hover:bg-accent transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" style={{ color: '#F05A26' }} />
        </button>
      )}
      <div className="w-full max-w-[360px] md:max-w-[520px] lg:max-w-[640px] space-y-3 md:space-y-5">
        <div className="text-center space-y-1.5 md:space-y-2">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
            {title}
          </h1>
          {subtext && (
            <p className="text-sm md:text-base font-medium" style={{ color: '#2788A0' }}>
              {subtext}
            </p>
          )}
        </div>

        <div className="space-y-2.5 md:space-y-3.5">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(option, index)}
              className="w-full h-auto min-h-[48px] md:min-h-[54px] py-3.5 md:py-4 px-4 md:px-5 text-sm md:text-base font-medium rounded-2xl
                       bg-card text-foreground border-2 border-border 
                       shadow-sm hover:shadow-lg hover:scale-[1.02] hover:border-primary/50
                       active:scale-[0.98] transition-all duration-200
                       focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                       leading-relaxed"
              data-step={step}
              data-question={`q${step}`}
              data-option-index={index}
              data-option-text={option}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
