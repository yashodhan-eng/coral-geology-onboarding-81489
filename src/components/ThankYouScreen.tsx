import { useEffect } from "react";

interface ThankYouScreenProps {
  title: string;
  subtext: string;
  delayMs: number;
  redirectUrl: string;
}

export const ThankYouScreen = ({
  title,
  subtext,
  delayMs,
  redirectUrl
}: ThankYouScreenProps) => {
  useEffect(() => {
    // Redirect after delay
    const redirectTimer = setTimeout(() => {
      window.location.assign(redirectUrl);
    }, delayMs);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [delayMs, redirectUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background animate-fade-in">
      <div className="flex flex-col items-center gap-8">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center px-4">
          Thank you for your interest!
        </h1>

        {/* Custom Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer circle - static */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          {/* Inner circle - rotating */}
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>

        {/* Status text */}
        <p className="text-lg text-muted-foreground animate-pulse">
          Redirecting you to the class page...
        </p>
      </div>
    </div>
  );
};
