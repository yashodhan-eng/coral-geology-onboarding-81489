import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneCallbackScreenProps {
  step: number;
  title: string;
  label: string;
  dayLabel: string;
  timeLabel: string;
  buttonEmpty: string;
  buttonFilled: string;
  dayOptions: string[];
  timeOptions: string[];
  onSubmit: (phone: string, preferredDay?: string, preferredTime?: string) => void;
  onBack: () => void;
  heroImage?: string;
}

export const PhoneCallbackScreen = ({
  step,
  title,
  label,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    // Allow skipping if no phone entered
    if (!phone) {
      onSubmit("", undefined, undefined);
      return;
    }
    
    // Submit with phone and preferences
    onSubmit(phone, preferredDay, preferredTime);
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
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              {title}
            </h2>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                {label} <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <div className="phone-input-wrapper">
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phone}
                  onChange={(value) => setPhone(value || "")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  placeholder={label}
                />
              </div>
            </div>

            {hasPhone && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferred-day" className="text-sm font-medium text-foreground">
                      {dayLabel}
                    </Label>
                    <Select value={preferredDay} onValueChange={setPreferredDay}>
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
                    <Select value={preferredTime} onValueChange={setPreferredTime}>
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

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button type="submit" size="lg">
              {hasPhone ? buttonFilled : buttonEmpty}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
