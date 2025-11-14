export const contentSchema = {
  redirectUrl: "https://www.coralacademy.com/class/geology-adventures-discover-earths-deep-secrets",
  logoSrc: "/src/assets/coral-academy-logo.png",
  q1: {
    title: "How soon are you looking to try our free classes?",
    subtext: "Let your child explore the world of rocks & fossils",
    options: [
      "Right away",
      "In 1–2 weeks",
      "Next month",
      "Just exploring"
    ]
  },
  q2: {
    title: "What topics is your child interested in?",
    subtext: "Select multiple and submit.",
    options: [
      "Entrepreneurship",
      "Science",
      "Coding",
      "AI",
      "Drawing",
      "Logic",
      "History",
      "Finance"
    ]
  },
  name: {
    title: "What's your name?",
    label: "Enter your name",
    button: "Next"
  },
  email: {
    title: "Kindly share your email address",
    label: "Enter your email",
    button: "Next"
  },
  phone: {
    title: "Prefer speaking to a specialist?",
    subtext: "We know this can feel overwhelming — let us help you 💛",
    label: "Enter your phone number",
    helperText: "No spam. We'll only call when you prefer.",
    dayLabel: "Preferred Day",
    timeLabel: "Preferred Time",
    buttonEmpty: "Skip & Submit",
    buttonFilled: "Submit",
    dayOptions: [
      "Weekday",
      "Weekend",
      "Any day"
    ],
    timeOptions: [
      "11 AM – 1 PM",
      "1 PM – 3 PM",
      "3 PM – 5 PM",
      "5 PM – 7 PM",
      "7 PM – 9 PM"
    ]
  },
  thankyou: {
    title: "Thanks! You're all set.",
    subtext: "Taking you to the class page…",
    delayMs: 1800
  }
};

export type OnboardingAnswers = {
  q1?: string;
  q2?: string;
  name?: string;
  email?: string;
  phone?: string;
  preferredDay?: string;
  preferredTime?: string;
  recaptchaToken?: string | null;
  timestamp?: number;
};
