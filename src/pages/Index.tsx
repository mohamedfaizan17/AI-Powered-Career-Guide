import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<string>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      // Load user's assessment data if exists
      loadUserAssessment();
    }
  }, [user, loading]);

  const loadUserAssessment = async () => {
    if (!user) return;
    
    const { data: assessment } = await supabase
      .from('skills_assessments')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(1)
      .single();

    if (assessment) {
      setAssessmentData({
        skills: (assessment.skills as Array<{ name: string; level: number }>) || [],
        interests: assessment.interests || [],
        experience: assessment.experience || ''
      });
      setHasCompletedAssessment(true);
      setCurrentPage('careers');
    }
  };

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = async (data: AssessmentData) => {
    if (!user) return;

    // Save to Supabase
    const { error } = await supabase
      .from('skills_assessments')
      .insert({
        user_id: user.id,
        skills: data.skills,
        interests: data.interests,
        experience: data.experience
      });

    if (!error) {
      setAssessmentData(data);
      setHasCompletedAssessment(true);
      setCurrentPage('careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  const showNavigation = currentPage !== 'hero' && user;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your career advisor...</p>
        </div>
      </div>
    );
  }

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
