import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  ExternalLink,
  Target,
  Building,
  Calendar,
  Check,
  Filter,
  Loader2
} from "lucide-react";
import { searchJobs, JobListing, INDIAN_CITIES, JobSearchParams } from "@/lib/jobScraper";

interface JobRecommendationsProps {
  userSkills?: Array<{ name: string; level: number }>;
  userInterests?: string[];
  userExperience?: string;
  filterByRole?: string;
}

export const JobRecommendations = ({ 
  userSkills = [], 
  userInterests = [], 
  userExperience = "", 
  filterByRole 
}: JobRecommendationsProps) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState(filterByRole || "");

  // Load jobs based on user profile and filters
  const loadJobs = async () => {
    setLoading(true);
    try {
      const searchParams: JobSearchParams = {
        skills: userSkills.map(skill => skill.name),
        experience: userExperience,
        location: selectedLocation || undefined,
        jobType: selectedJobType || undefined
      };

      const jobResults = await searchJobs(searchParams);
      setJobs(jobResults);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [userSkills, userExperience, selectedLocation, selectedJobType]);

  useEffect(() => {
    if (filterByRole) {
      setCurrentFilter(filterByRole);
    }
  }, [filterByRole]);

  // Filter jobs based on current filter
  const filteredJobs = currentFilter 
    ? jobs.filter(job => job.title.toLowerCase().includes(currentFilter.toLowerCase()))
    : jobs;

  const handleApplyJob = (job: JobListing) => {
    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank');
    }
  };

  const getMatchScore = (job: JobListing): number => {
    if (!userSkills.length) return 75;
    
    const matchingSkills = job.skills.filter(skill => 
      userSkills.some(userSkill => 
        skill.toLowerCase().includes(userSkill.name.toLowerCase()) ||
        userSkill.name.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    return Math.min(95, 60 + (matchingSkills.length * 10));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Finding Perfect Jobs for You</h2>
          <p className="text-muted-foreground">Searching through thousands of opportunities in Indian cities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          🚀 Job Opportunities in India
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover {jobs.length}+ opportunities tailored to your skills across major Indian cities
        </p>
        
        {/* Skills Summary */}
        {userSkills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Matching jobs based on your skills:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {userSkills.slice(0, 8).map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-primary/10">
                  {skill.name}
                </Badge>
              ))}
              {userSkills.length > 8 && (
                <Badge variant="outline" className="bg-muted">
                  +{userSkills.length - 8} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Cities</SelectItem>
                    {INDIAN_CITIES.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Job Type</label>
                <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button onClick={loadJobs} className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Refresh Jobs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6">
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or check back later for new opportunities.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job) => {
            const matchScore = getMatchScore(job);
            
            return (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{matchScore}% Match</span>
                      </div>
                      <Badge variant={job.jobType === 'Full-time' ? 'default' : 'secondary'}>
                        {job.jobType}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{job.description}</p>
                    
                    <div>
                      <h4 className="font-medium mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => {
                          const isUserSkill = userSkills.some(userSkill => 
                            skill.toLowerCase().includes(userSkill.name.toLowerCase()) ||
                            userSkill.name.toLowerCase().includes(skill.toLowerCase())
                          );
                          
                          return (
                            <Badge 
                              key={index} 
                              variant={isUserSkill ? "default" : "outline"}
                              className={isUserSkill ? "bg-green-100 text-green-800 border-green-300" : ""}
                            >
                              {isUserSkill && <Check className="h-3 w-3 mr-1" />}
                              {skill}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Experience: {job.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Posted {formatDate(job.postedDate)}</span>
                        </div>
                        {job.remote && (
                          <Badge variant="outline" className="text-blue-600 border-blue-300">
                            Remote
                          </Badge>
                        )}
                      </div>
                      
                      <Button onClick={() => handleApplyJob(job)} className="ml-4">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      
      {/* Load More Button */}
      {filteredJobs.length > 0 && (
        <div className="text-center mt-8">
          <Button onClick={loadJobs} variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
};
