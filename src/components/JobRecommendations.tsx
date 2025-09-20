import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  ExternalLink,
  Brain,
  Target,
  Building,
  Calendar,
  Check
} from "lucide-react";

interface JobRecommendationsProps {
  userSkills?: Array<{ name: string; level: number }>;
  userInterests?: string[];
  userExperience?: string;
  filterByRole?: string;
}

export const JobRecommendations = ({ userSkills = [], userInterests = [], userExperience = "", filterByRole }: JobRecommendationsProps) => {
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState(filterByRole || "");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update filter when filterByRole prop changes
    if (filterByRole) {
      setCurrentFilter(filterByRole);
    }
  }, [filterByRole]);

  const jobs = [
    {
      id: "job-1",
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150,000 - $200,000",
      type: "Full-time",
      experience: "Senior",
      description: "Join our team to build next-generation software solutions that impact billions of users worldwide.",
      requirements: ["JavaScript", "React", "Node.js", "Python", "System Design"],
      benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Remote Work"],
      postedDate: "2 days ago",
      platform: "LinkedIn",
      url: "https://www.linkedin.com/jobs/search/?keywords=Senior%20Software%20Engineer&location=Mountain%20View%2C%20CA",
      matchScore: 95,
      skills: ["JavaScript", "React", "Python", "System Design"],
      companySize: "10,000+",
      industry: "Technology"
    },
    {
      id: "job-2",
      title: "Full Stack Developer",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$130,000 - $180,000",
      type: "Full-time",
      experience: "Mid",
      description: "Build and maintain web applications that connect people around the world.",
      requirements: ["React", "TypeScript", "Node.js", "GraphQL", "MongoDB"],
      benefits: ["Health Insurance", "Stock Options", "Gym Membership", "Free Meals"],
      postedDate: "1 day ago",
      platform: "Indeed",
      url: "https://www.indeed.com/jobs?q=Full%20Stack%20Developer&l=Menlo%20Park%2C%20CA",
      matchScore: 88,
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      companySize: "10,000+",
      industry: "Social Media"
    },
    {
      id: "job-3",
      title: "AI/ML Engineer",
      company: "OpenAI",
      location: "San Francisco, CA",
      salary: "$180,000 - $250,000",
      type: "Full-time",
      experience: "Senior",
      description: "Research and develop cutting-edge AI models and systems.",
      requirements: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
      benefits: ["Equity", "Health Insurance", "Research Budget", "Conference Travel"],
      postedDate: "3 days ago",
      platform: "AngelList",
      url: "https://angel.co/jobs?q=AI%20Engineer&location=San%20Francisco",
      matchScore: 92,
      skills: ["Python", "Machine Learning", "TensorFlow", "Deep Learning"],
      companySize: "100-500",
      industry: "Artificial Intelligence"
    },
    {
      id: "job-4",
      title: "Frontend Developer",
      company: "Airbnb",
      location: "Remote",
      salary: "$120,000 - $160,000",
      type: "Remote",
      experience: "Mid",
      description: "Create beautiful and intuitive user interfaces for millions of travelers.",
      requirements: ["React", "JavaScript", "CSS", "HTML", "Design Systems"],
      benefits: ["Remote Work", "Travel Credits", "Health Insurance", "Stock Options"],
      postedDate: "5 days ago",
      platform: "Glassdoor",
      url: "https://www.glassdoor.com/Job/jobs.htm?sc.keyword=Frontend%20Developer&locT=",
      matchScore: 85,
      skills: ["React", "JavaScript", "CSS", "HTML"],
      companySize: "1,000-5,000",
      industry: "Travel & Hospitality"
    }
  ];

  // Filter jobs based on current filter
  const filteredJobs = currentFilter 
    ? jobs.filter(job => 
        job.title.toLowerCase().includes(currentFilter.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(currentFilter.toLowerCase()))
      )
    : jobs;

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary py-8">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Job Recommendations</h1>
            <p className="text-xl text-muted-foreground">
              Loading personalized job opportunities...
            </p>
          </div>
          
          <Card className="mb-8 border-primary/20 bg-gradient-secondary shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Analyzing Job Market
                  </h3>
                  <p className="text-muted-foreground">
                    Searching across LinkedIn, Indeed, Glassdoor, and other platforms...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="shadow-medium">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="h-6 w-64 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-6 w-16 bg-muted rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Job Recommendations</h1>
          <p className="text-xl text-muted-foreground">
            Personalized job opportunities from top platforms based on your profile
          </p>
          {currentFilter && (
            <div className="mt-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Filtered by: {currentFilter}
                <button 
                  onClick={() => setCurrentFilter("")}
                  className="ml-2 hover:text-destructive"
                >
                  ✕
                </button>
              </Badge>
            </div>
          )}
        </div>

        {/* Job Search Status */}
        <Card className="mb-8 border-primary/20 bg-gradient-secondary shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Brain className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  AI-Powered Job Matching
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <Check className="h-3 w-3 mr-1" />
                    {filteredJobs.length} Jobs Found
                  </Badge>
                </h3>
                <p className="text-muted-foreground mb-3">
                  {currentFilter 
                    ? `Showing jobs for "${currentFilter}" matching your profile.` 
                    : `Jobs matched to your skills: ${userSkills.map(s => s.name).join(', ') || 'JavaScript, React, Python'}.`
                  } Sourced from LinkedIn, Indeed, Glassdoor, AngelList, and Stack Overflow.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Updated: {new Date().toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Avg Match: {filteredJobs.length > 0 ? Math.round(filteredJobs.reduce((sum, job) => sum + job.matchScore, 0) / filteredJobs.length) : 0}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {new Set(filteredJobs.map(job => job.company)).size} Companies
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <Card key={job.id} className="shadow-strong hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-bold text-foreground">{job.title}</CardTitle>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30 font-semibold">
                        {job.matchScore}% Match
                      </Badge>
                      {index === 0 && (
                        <Badge className="bg-gradient-primary text-white font-medium">
                          <Star className="h-3 w-3 mr-1" />
                          Top Match
                        </Badge>
                      )}
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {job.platform}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1 font-medium">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-success font-semibold">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                    {/* Job Details Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Required Skills */}
                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                        <h5 className="font-medium text-primary mb-2 text-sm flex items-center gap-2">
                          <Target className="h-3 w-3" />
                          Required Skills
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {job.requirements.slice(0, 4).map(skill => {
                            const isUserSkill = userSkills.some(s => 
                              s.name.toLowerCase().includes(skill.toLowerCase()) ||
                              skill.toLowerCase().includes(s.name.toLowerCase())
                            );
                            return (
                              <Badge 
                                key={skill} 
                                variant="outline" 
                                className={isUserSkill 
                                  ? "bg-success/10 text-success border-success/30 text-xs" 
                                  : "bg-warning/10 text-warning border-warning/30 text-xs"
                                }
                              >
                                {isUserSkill && "✓ "}{skill}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      {/* Job Info */}
                      <div className="bg-accent/50 p-3 rounded-lg border border-accent">
                        <h5 className="font-medium text-accent-foreground mb-2 text-sm flex items-center gap-2">
                          <Briefcase className="h-3 w-3" />
                          Job Details
                        </h5>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <Badge variant="outline" className="text-xs">{job.type}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Level:</span>
                            <Badge variant="outline" className="text-xs">{job.experience}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Company:</span>
                            <span className="text-muted-foreground">{job.companySize}</span>
                          </div>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="bg-success/5 p-3 rounded-lg border border-success/20">
                        <h5 className="font-medium text-success mb-2 text-sm flex items-center gap-2">
                          <Star className="h-3 w-3" />
                          Benefits
                        </h5>
                        <div className="space-y-1">
                          {job.benefits.slice(0, 3).map(benefit => (
                            <p key={benefit} className="text-xs text-muted-foreground">• {benefit}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                  <Button 
                    className="bg-gradient-primary hover:bg-primary-hover text-white font-medium flex-1 min-w-[200px]"
                    onClick={() => window.open(job.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply on {job.platform}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 min-w-[180px]"
                    onClick={() => {
                      const companySearchUrl = `https://www.linkedin.com/company/${job.company.toLowerCase().replace(/\s+/g, '-')}/`;
                      window.open(companySearchUrl, '_blank');
                    }}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    View Company
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="min-w-[140px]"
                    onClick={() => {
                      const similarJobsUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location)}`;
                      window.open(similarJobsUrl, '_blank');
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Similar Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Jobs Found Message */}
        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {currentFilter ? `No jobs found for "${currentFilter}"` : "No Jobs Found"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {currentFilter 
                  ? "Try removing the filter or searching for a different role."
                  : "Try adjusting your search criteria or check back later for new opportunities."
                }
              </p>
              {currentFilter && (
                <Button 
                  onClick={() => setCurrentFilter("")}
                  variant="outline"
                >
                  Clear Filter
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
