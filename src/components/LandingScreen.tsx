import coralLogo from "@/assets/coral-academy-logo.png";
import heroImage from "@/assets/geology-class-preview.jpg";
import { Mountain, Waves, Bone, FlaskConical, ChevronDown, Calendar, PlayCircle, MapPin, Star, Award, Users, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface LandingScreenProps {
  onContinue: () => void;
}

export const LandingScreen = ({ onContinue }: LandingScreenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleCTAClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_hero_click',
      element_type: 'button',
      element_text: 'Try for Free',
      page_section: 'hero'
    });
    onContinue();
  };

  const handleVideoPlay = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Geology_onboarding_video_play',
      element_type: 'video',
      video_title: 'Class Preview Video'
    });
    setShowVideo(true);
  };

  const handleLearnMoreToggle = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: isExpanded ? 'Geology_onboarding_learn_more_collapse' : 'Geology_onboarding_learn_more_expand',
      element_type: 'toggle',
      element_text: 'Learn More'
    });
    setIsExpanded(!isExpanded);
  };

  const handleScheduleToggle = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: isScheduleExpanded ? 'Geology_onboarding_schedule_collapse' : 'Geology_onboarding_schedule_expand',
      element_type: 'toggle',
      element_text: 'See Full Schedule'
    });
    setIsScheduleExpanded(!isScheduleExpanded);
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Logo at top center */}
      <div className="flex items-center justify-center px-6 md:px-10 py-6 md:py-8">
        <img 
          src={coralLogo} 
          alt="Coral Academy" 
          className="h-10 md:h-12"
        />
      </div>

      {/* Trustpilot Rating */}
      <div className="flex items-center justify-center px-6 md:px-10 pb-2 md:pb-6">
        <div className="bg-white rounded-lg border border-border px-3 md:px-5 py-1.5 md:py-3 flex items-center justify-center gap-1.5 md:gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mx-4">
          <span className="font-poppins font-semibold text-[12px] md:text-[16px] lg:text-[18px] text-foreground whitespace-nowrap">
            Excellent
          </span>
          <div className="flex items-center gap-0.5 md:gap-1">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
            ))}
            <Star className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} style={{ clipPath: 'inset(0 30% 0 0)' }} />
          </div>
          <span className="font-poppins font-medium text-[11px] md:text-[14px] lg:text-[16px] text-secondary whitespace-nowrap">
            4.7/5
          </span>
          <div className="h-3 md:h-5 w-px bg-border" />
          <span className="font-poppins font-semibold text-[11px] md:text-[14px] lg:text-[16px] text-foreground whitespace-nowrap">
            Trustpilot
          </span>
        </div>
      </div>

      <main className="pb-12">
        <div className="animate-fade-in">
          <div className="w-full max-w-[900px] mx-auto px-6 md:px-10 lg:px-20">
            {/* Ages Tag - Moved Above Title */}
            <div className="text-center mb-4 md:mb-6">
              <div className="inline-block bg-[#FFF1EC] border border-primary rounded-full px-3 md:px-[14px] py-1 md:py-[6px]">
                <span className="font-poppins font-medium text-[13px] md:text-[14px] text-primary">
                  Ages 8–13
                </span>
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center mb-4 md:mb-6">
              <h1 className="font-poppins font-semibold text-[24px] md:text-[32px] lg:text-[36px] text-foreground leading-[1.2]">
                Geology Adventures
              </h1>
              <p className="font-poppins text-[24px] md:text-[32px] lg:text-[36px] text-foreground font-semibold leading-[1.2] mb-4 md:mb-5">
                Discover Earth's Deep Secrets
              </p>
              <p className="font-poppins text-[14px] md:text-[18px] text-secondary font-medium tracking-wide">
                Live, weekly classes where kids explore the wonders of Earth.
              </p>
            </div>

            {/* Testimonial Section */}
            <div className="mb-2.5 md:mb-6 max-w-[700px] mx-auto">
              {/* Testimonial Slider */}
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: false,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {/* Testimonial 1 */}
                  <CarouselItem>
                    <div 
                      className="bg-white rounded-xl p-4 md:p-6 border border-[#E6E6E6]"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" strokeWidth={0} />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="font-poppins text-[15px] text-foreground leading-relaxed mb-4">
                        My daughter loved showing her rock collection during class.
                      </p>

                      {/* Parent Info */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="font-poppins font-semibold text-[14px] text-white">
                            E
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-[13px] text-[#333333]">
                            Emily
                          </p>
                          <p className="font-poppins text-[13px] text-[#777777]">
                            Oregon
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Testimonial 2 */}
                  <CarouselItem>
                    <div 
                      className="bg-white rounded-xl p-4 md:p-6 border border-[#E6E6E6]"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" strokeWidth={0} />
                        ))}
                        <Star className="w-4 h-4 fill-primary text-primary" strokeWidth={0} style={{ clipPath: 'inset(0 50% 0 0)' }} />
                      </div>

                      {/* Quote */}
                      <p className="font-poppins text-[15px] text-foreground leading-relaxed mb-4">
                        The geology activities make science feel real and fun.
                      </p>

                      {/* Parent Info */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="font-poppins font-semibold text-[14px] text-white">
                            M
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-[13px] text-[#333333]">
                            Mark
                          </p>
                          <p className="font-poppins text-[13px] text-[#777777]">
                            Texas
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Testimonial 3 */}
                  <CarouselItem>
                    <div 
                      className="bg-white rounded-xl p-4 md:p-6 border border-[#E6E6E6]"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" strokeWidth={0} />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="font-poppins text-[15px] text-foreground leading-relaxed mb-4">
                        A perfect blend of science and creativity. She looks forward to every single class.
                      </p>

                      {/* Parent Info */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="font-poppins font-semibold text-[14px] text-white">
                            P
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-[13px] text-[#333333]">
                            Priya
                          </p>
                          <p className="font-poppins text-[13px] text-[#777777]">
                            New Jersey
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Testimonial 4 */}
                  <CarouselItem>
                    <div 
                      className="bg-white rounded-xl p-4 md:p-6 border border-[#E6E6E6]"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" strokeWidth={0} />
                        ))}
                        <Star className="w-4 h-4 fill-primary text-primary" strokeWidth={0} style={{ clipPath: 'inset(0 50% 0 0)' }} />
                      </div>

                      {/* Quote */}
                      <p className="font-poppins text-[15px] text-foreground leading-relaxed mb-4">
                        They make topics like fossils and volcanoes exciting and easy to understand.
                      </p>

                      {/* Parent Info */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="font-poppins font-semibold text-[14px] text-white">
                            S
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-[13px] text-[#333333]">
                            Sarah
                          </p>
                          <p className="font-poppins text-[13px] text-[#777777]">
                            California
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Testimonial 5 */}
                  <CarouselItem>
                    <div 
                      className="bg-white rounded-xl p-4 md:p-6 border border-[#E6E6E6]"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" strokeWidth={0} />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="font-poppins text-[15px] text-foreground leading-relaxed mb-4">
                        Engaging hands on sessions that make science come alive.
                      </p>

                      {/* Parent Info */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="font-poppins font-semibold text-[14px] text-white">
                            D
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-[13px] text-[#333333]">
                            Daniel
                          </p>
                          <p className="font-poppins text-[13px] text-[#777777]">
                            Washington
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Testimonial 6 */}
                  <CarouselItem>
                    <div 
                      className="bg-white rounded-xl p-4 md:p-6 border border-[#E6E6E6]"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" strokeWidth={0} />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="font-poppins text-[15px] text-foreground leading-relaxed mb-4">
                        "Geology Adventures was the highlight of our week — educational and exciting!"
                      </p>

                      {/* Parent Info */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="font-poppins font-semibold text-[14px] text-white">
                            S
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-[13px] text-[#333333]">
                            Sofia
                          </p>
                          <p className="font-poppins text-[13px] text-[#777777]">
                            Oregon
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-3 md:mb-5">
              <button
                onClick={onContinue}
                className="h-[46px] md:h-[52px] px-10 md:px-12 font-poppins font-semibold text-[15px] 
                         text-white rounded-full
                         shadow-[0_3px_10px_rgba(240,90,38,0.25)] hover:shadow-[0_6px_20px_rgba(240,90,38,0.35)]
                         hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(180deg, #F46A37 0%, #E85522 100%)'
                }}
              >
                 Try for Free
              </button>
            </div>

            {/* Schedule Block */}
            <div className="text-center mb-2.5 md:mb-4 px-4">
              <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 md:px-5 py-2 md:py-2.5 backdrop-blur-sm">
                <p className="font-inter text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">
                  Weekly batches
                </p>
                <p className="font-inter text-[13px] md:text-[14px] text-primary font-semibold">
                  Mon 3:00 PM PST · Tue 1:00 PM PST
                </p>
              </div>
            </div>

            {/* Feature Highlights Carousel */}
            <div className="mb-4 md:mb-6 overflow-hidden">
              {/* Mobile Version - Keep Exactly As Is */}
              <div className="md:hidden">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnInteraction: false,
                      stopOnMouseEnter: false,
                    }),
                  ]}
                  className="w-full max-w-[700px] mx-auto"
                >
                  <CarouselContent className="-ml-2">
                    <CarouselItem className="pl-2 basis-full">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-14 flex items-center justify-center gap-2 px-6">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[13px] text-foreground text-center leading-tight px-1">
                          100+ Years of Collective Teaching Experience
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="pl-2 basis-full">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-14 flex items-center justify-center gap-2 px-6">
                        <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                         <span className="font-poppins font-medium text-[13px] text-foreground whitespace-nowrap">
                          Founded by a Stanford Alum & Parent
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="pl-2 basis-full">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-14 flex items-center justify-center gap-2 px-6">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[13px] text-foreground whitespace-nowrap">
                          Loved by 1000+ Families
                        </span>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>

              {/* Tablet/Desktop Version - Optimized */}
              <div className="hidden md:block relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    dragFree: false,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnInteraction: false,
                      stopOnMouseEnter: false,
                    }),
                  ]}
                  className="w-full max-w-[1100px] mx-auto px-4"
                >
                  <CarouselContent className="gap-4">
                    <CarouselItem className="md:basis-1/3">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2 px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] mx-2">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[12px] lg:text-[13px] text-foreground text-center leading-tight">
                          100+ Years of Collective Teaching Experience
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/3">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2 px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] mx-2">
                        <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                         <span className="font-poppins font-medium text-[12px] lg:text-[13px] text-foreground text-center leading-tight">
                          Founded by a Stanford Alum & Parent
                        </span>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/3">
                      <div className="bg-white rounded-full border border-[#EDEDED] shadow-[0_2px_8px_rgba(0,0,0,0.05)] h-16 flex items-center justify-center gap-2 px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] mx-2">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                        <span className="font-poppins font-medium text-[12px] lg:text-[13px] text-foreground text-center leading-tight">
                          Loved by 1000+ Families
                        </span>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>

            {/* What Kids Learn Title */}
            <div className="text-center mb-6">
              <h2 className="font-poppins font-semibold text-[22px] md:text-[24px] text-foreground">
                What Kids Learn
              </h2>
            </div>

            {/* Learning Outcomes Section */}
            <div className="mb-10 md:mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[700px] mx-auto">
                {/* Learn About Rocks and Minerals */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Mountain className="w-6 h-6 text-primary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Learn About Rocks and Minerals
                  </p>
                </div>
                
                {/* Explore Volcanoes and Landforms */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Waves className="w-6 h-6 text-accent mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Explore Volcanoes and Landforms
                  </p>
                </div>
                
                {/* Discover Fossils and Prehistoric Life */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Bone className="w-6 h-6 text-secondary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Discover Fossils and Prehistoric Life
                  </p>
                </div>
                
                {/* Do Science Experiments and Creative Projects */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <FlaskConical className="w-6 h-6 text-primary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Do Science Experiments and Creative Projects
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Schedule Expandable Section */}
            <div className="mb-10 md:mb-12 max-w-[700px] mx-auto">
              <div 
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Header - Always Visible */}
                <button
                  onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
                  className="w-full p-5 md:p-6 flex items-center justify-between hover:bg-background/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" strokeWidth={2} />
                    <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-foreground text-left">
                      Upcoming Schedule
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-secondary transition-transform duration-200 ${isScheduleExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expandable Content */}
                {isScheduleExpanded && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 space-y-6 animate-fade-in">
                    {/* Week 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 1
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          Mineral Testing
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Discover how geologists identify minerals using a variety of tests.
                        </p>
                      </div>
                    </div>

                    {/* Week 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 2
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          The Shapes of Crystals
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Explore geometric crystal structures and learn why minerals grow into unique shapes.
                        </p>
                      </div>
                    </div>

                    {/* Week 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 3
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          How to Find Fossils
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Learn where fossils form, how to spot them, and what clues they reveal.
                        </p>
                      </div>
                    </div>

                    {/* Week 4 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 4
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          Giants of the Past
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Meet enormous prehistoric creatures like titanoboa, deinosuchus, and more.
                        </p>
                      </div>
                    </div>

                    {/* Week 5 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20">
                        <span className="font-poppins font-semibold text-[15px] text-primary">
                          Week 5
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[15px] md:text-[16px] text-foreground mb-1">
                          Prehistoric Wildlife
                        </h4>
                        <p className="font-poppins text-[14px] md:text-[15px] text-secondary">
                          Discover extraordinary animals that roamed Earth long before humans.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Section - Moved from Top */}
            <div className="mb-10 md:mb-12 max-w-[720px] mx-auto">
              {/* Section Header */}
              <div className="text-center mb-6">
                <h2 className="font-poppins font-semibold text-[24px] text-[#1A1A1A] mb-2">
                  A Sneak Peek of Our Class
                </h2>
                <p className="font-inter text-[15px] text-accent">
                  See how kids explore rocks, crystals, fossils, and Earth science through fun hands-on activities.
                </p>
              </div>

              {/* Video Player */}
              <div className="relative group cursor-pointer" onClick={() => setShowVideo(true)}>
                <img 
                  src={heroImage} 
                  alt="Geology Adventures Class Preview" 
                  className="w-full h-auto rounded-2xl border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 rounded-full p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-200">
                    <PlayCircle className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Dialog */}
            <Dialog open={showVideo} onOpenChange={setShowVideo}>
              <DialogContent className="p-0 bg-black border-none" style={{ width: '60vh', maxWidth: '90vw', aspectRatio: '9/16' }}>
                <video 
                  controls 
                  autoPlay
                  className="w-full h-full"
                >
                  <source src="/videos/ITW_V4.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </DialogContent>
            </Dialog>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={onContinue}
                className="h-[50px] md:h-[52px] px-10 md:px-12 font-poppins font-semibold text-[15px] 
                         text-white rounded-full
                         shadow-[0_3px_10px_rgba(240,90,38,0.25)] hover:shadow-[0_6px_20px_rgba(240,90,38,0.35)]
                         hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(180deg, #F46A37 0%, #E85522 100%)'
                }}
              >
                 Try for Free
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
