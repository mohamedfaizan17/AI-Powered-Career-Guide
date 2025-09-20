import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SkillsAssessment } from "@/components/SkillsAssessment";
import { EnhancedCareerRecommendations } from "@/components/EnhancedCareerRecommendations";
import { MarketIntelligence } from "@/components/MarketIntelligence";
import { LearningPaths } from "@/components/LearningPaths";
import { JobRecommendations } from "@/components/JobRecommendations";

interface AssessmentData {
  skills: Array<{ name: string; level: number }>;
  interests: string[];
  experience: string;
}

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [jobFilter, setJobFilter] = useState<string>("");

  useEffect(() => {
    if (!loading && user) {
      // Load user's assessment data if exists
      loadUserAssessment();
    }
  }, [user, loading]);

  // Handle URL parameters for new users
  useEffect(() => {
    const page = searchParams.get('page');
    const newUserParam = searchParams.get('newUser');
    
    if (!loading && user && page === 'assessment' && newUserParam === 'true') {
      // New user should go directly to assessment
      setCurrentPage('assessment');
      setIsNewUser(true);
      // Clean up URL parameters
      setSearchParams({});
    }
  }, [searchParams, user, loading, setSearchParams]);

  const loadUserAssessment = async () => {
    if (!user) return;
    
    // Load assessment from localStorage for now
    // TODO: Replace with API call to Prisma backend
    const assessmentKey = `assessment_${user.id}`;
    const savedAssessment = localStorage.getItem(assessmentKey);
    
    if (savedAssessment) {
      try {
        const assessment = JSON.parse(savedAssessment);
        setAssessmentData({
          skills: assessment.skills || [],
          interests: assessment.interests || [],
          experience: assessment.experience || ''
        });
        setHasCompletedAssessment(true);
        setCurrentPage('careers');
      } catch (error) {
        console.error('Error loading assessment:', error);
      }
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

    // Save to localStorage for now
    // TODO: Replace with API call to Prisma backend
    try {
      const assessmentKey = `assessment_${user.id}`;
      localStorage.setItem(assessmentKey, JSON.stringify({
        skills: data.skills,
        interests: data.interests,
        experience: data.experience,
        completedAt: new Date().toISOString()
      }));

      setAssessmentData(data);
      setHasCompletedAssessment(true);
      setIsNewUser(false); // Reset new user flag after assessment
      setCurrentPage('careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };

  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      setCurrentPage(hasCompletedAssessment ? 'careers' : 'hero');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearningPath = (careerTitle: string) => {
    console.log('Starting learning path for:', careerTitle);
    setCurrentPage('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToJobs = (jobTitle?: string) => {
    console.log('Navigating to jobs for:', jobTitle);
    setJobFilter(jobTitle || "");
    setCurrentPage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'hero':
        return <HeroSection onGetStarted={handleGetStarted} />;
      
      case 'assessment':
        return <SkillsAssessment onComplete={handleAssessmentComplete} isNewUser={isNewUser} />;
      
      case 'careers':
        return assessmentData ? (
          <EnhancedCareerRecommendations 
            assessmentData={assessmentData} 
            onStartLearningPath={handleStartLearningPath}
            onNavigateToJobs={handleNavigateToJobs}
          />
        ) : (
          <HeroSection onGetStarted={handleGetStarted} />
        );
      
      case 'learning':
        return (
          <LearningPaths 
            userSkills={assessmentData?.skills} 
            userInterests={assessmentData?.interests}
            userExperience={assessmentData?.experience}
          />
        );
      
      case 'jobs':
        return (
          <JobRecommendations 
            userSkills={assessmentData?.skills} 
            userInterests={assessmentData?.interests}
            userExperience={assessmentData?.experience}
            filterByRole={jobFilter}
          />
        );
      
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
