import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SkillsAssessment } from "@/components/SkillsAssessment";
import { CareerRecommendations } from "@/components/CareerRecommendations";

interface AssessmentData {
  skills: Array<{ name: string; level: number }>;
  interests: string[];
  experience: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'assessment' | 'recommendations'>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('assessment');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setCurrentStep('recommendations');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentStep === 'assessment' && (
        <SkillsAssessment onComplete={handleAssessmentComplete} />
      )}
      
      {currentStep === 'recommendations' && assessmentData && (
        <CareerRecommendations assessmentData={assessmentData} />
      )}
    </div>
  );
};

export default Index;
