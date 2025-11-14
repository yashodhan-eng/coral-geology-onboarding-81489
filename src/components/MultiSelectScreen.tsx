import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface MultiSelectScreenProps {
  step: number;
  title: string;
  subtext?: string;
  options: string[];
  onSubmit: (selectedOptions: string[]) => void;
  onBack?: () => void;
}

export const MultiSelectScreen = ({ 
  step, 
  title, 
  subtext, 
  options, 
  onSubmit,
  onBack
}: MultiSelectScreenProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: isSelected ? 'Geology_onboarding_multiselect_deselect' : 'Geology_onboarding_multiselect_select',
      element_type: 'multiselect_option',
      step_number: step,
      question_title: title,
      selected_option: option,
      total_selected: isSelected ? selectedOptions.length - 1 : selectedOptions.length + 1
    });
    
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'Geology_onboarding_multiselect_submit',
        element_type: 'button',
        step_number: step,
        question_title: title,
        selected_options: selectedOptions.join(', '),
        total_selected: selectedOptions.length
      });
      onSubmit(selectedOptions);
    }
  };

  const handleBackClick = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'Geology_onboarding_back_button',
      element_type: 'button',
      step_number: step,
      page_section: 'multiselect_screen'
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
      <div className="w-full max-w-[360px] md:max-w-[680px] lg:max-w-[800px] space-y-2.5 md:space-y-4">
        <div className="text-center space-y-1 md:space-y-1.5">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground leading-tight">
            {title}
          </h1>
          {subtext && (
            <p className="text-xs md:text-sm font-medium" style={{ color: '#2788A0' }}>
              {subtext}
            </p>
          )}
        </div>

        {/* Options Grid - 2x4 on mobile, 4x2 on tablet/desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => toggleOption(option)}
              className={`h-auto min-h-[42px] md:min-h-[46px] py-2.5 md:py-3 px-3 text-[13px] md:text-[14px] font-medium rounded-full
                       border-2 transition-all duration-200
                       shadow-sm hover:shadow-lg hover:scale-[1.02]
                       active:scale-[0.98]
                       focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                       ${selectedOptions.includes(option)
                         ? 'bg-[#F05A26] text-white border-[#F05A26]'
                         : 'bg-card text-foreground border-border hover:border-primary/50'
                       }`}
              data-step={step}
              data-question={`q${step}`}
              data-option-index={index}
              data-option-text={option}
              data-selected={selectedOptions.includes(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-0.5 md:pt-1">
          <Button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
            className="w-full max-w-[280px] h-[40px] text-sm md:text-base font-semibold rounded-full
                     bg-[#F05A26] hover:bg-[#D94D20] text-white
                     shadow-md hover:shadow-xl hover:scale-[1.02]
                     active:scale-[0.98] transition-all duration-200
                     focus-visible:ring-2 focus-visible:ring-[#F05A26] focus-visible:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
