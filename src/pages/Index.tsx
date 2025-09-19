import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SkillsAssessment } from "@/components/SkillsAssessment";
import { EnhancedCareerRecommendations } from "@/components/EnhancedCareerRecommendations";
import { MarketIntelligence } from "@/components/MarketIntelligence";
import { LearningPaths } from "@/components/LearningPaths";

interface AssessmentData {
  skills: Array<{ name: string; level: number }>;
  interests: string[];
  experience: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<string>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  const handleGetStarted = () => {
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setHasCompletedAssessment(true);
    setCurrentPage('careers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      setCurrentPage(hasCompletedAssessment ? 'careers' : 'hero');
    } else if (page === 'careers' && !hasCompletedAssessment) {
      setCurrentPage('assessment');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'hero':
        return <HeroSection onGetStarted={handleGetStarted} />;
      
      case 'assessment':
        return <SkillsAssessment onComplete={handleAssessmentComplete} />;
      
      case 'careers':
        return assessmentData ? (
          <EnhancedCareerRecommendations assessmentData={assessmentData} />
        ) : (
          <HeroSection onGetStarted={handleGetStarted} />
        );
      
      case 'learning':
        return <LearningPaths userSkills={assessmentData?.skills} />;
      
      case 'market':
        return <MarketIntelligence />;
      
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  const showNavigation = currentPage !== 'hero';

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
        />
      )}
      
      {renderContent()}
    </div>
  );
};

export default Index;
