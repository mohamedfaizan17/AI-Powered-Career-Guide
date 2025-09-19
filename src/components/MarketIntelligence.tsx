import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  MapPin, 
  Calendar,
  Briefcase,
  AlertCircle
} from "lucide-react";

// Mock data - In production, this would come from real APIs
const marketData = {
  trendingSkills: [
    { name: "Artificial Intelligence", growth: 45, demand: "Very High", salary: "$95k - $150k" },
    { name: "React/Next.js", growth: 32, demand: "High", salary: "$80k - $130k" },
    { name: "Python", growth: 28, demand: "Very High", salary: "$75k - $125k" },
    { name: "Cloud Computing", growth: 38, demand: "High", salary: "$85k - $140k" },
    { name: "Data Science", growth: 35, demand: "High", salary: "$90k - $145k" }
  ],
  jobMarketTrends: [
    { 
      role: "AI/ML Engineer", 
      growth: 42, 
      openings: 12500, 
      avgSalary: "$125k",
      locations: ["San Francisco", "New York", "Seattle"],
      trend: "up"
    },
    { 
      role: "Full Stack Developer", 
      growth: 25, 
      openings: 45000, 
      avgSalary: "$95k",
      locations: ["Austin", "Denver", "Remote"],
      trend: "up"
    },
    { 
      role: "Product Manager", 
      growth: 18, 
      openings: 8300, 
      avgSalary: "$115k",
      locations: ["Silicon Valley", "Boston", "Chicago"],
      trend: "stable"
    },
    { 
      role: "Data Analyst", 
      growth: 15, 
      openings: 23000, 
      avgSalary: "$75k",
      locations: ["New York", "Los Angeles", "Remote"],
      trend: "down"
    }
  ],
  industryInsights: [
    {
      industry: "Technology",
      growth: "+22%",
      keyDrivers: ["AI Revolution", "Cloud Migration", "Remote Work Tools"],
      riskFactors: ["Economic Uncertainty", "Skill Shortage"]
    },
    {
      industry: "Healthcare",
      growth: "+18%",
      keyDrivers: ["Digital Health", "Aging Population", "AI Diagnostics"],
      riskFactors: ["Regulation Changes", "Cost Pressures"]
    },
    {
      industry: "Finance",
      growth: "+12%",
      keyDrivers: ["Fintech Innovation", "Blockchain", "Risk Management"],
      riskFactors: ["Market Volatility", "Regulatory Compliance"]
    }
  ]
};

export const MarketIntelligence = () => {
  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Market Intelligence</h1>
          <p className="text-xl text-muted-foreground">
            Real-time insights into job market trends, skill demands, and salary data
          </p>
        </div>

        {/* API Integration Notice */}
        <Card className="mb-8 border-warning/20 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Connect Real Data Sources</h3>
                <p className="text-muted-foreground mb-3">
                  Currently showing mock data. Connect to Supabase to integrate with LinkedIn Jobs API, 
                  Indeed API, Bureau of Labor Statistics, and other real-time data sources.
                </p>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Requires Supabase Integration
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trending Skills */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Trending Skills
              </CardTitle>
              <CardDescription>
                Most in-demand skills based on job posting analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketData.trendingSkills.map((skill) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground">{skill.salary}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={skill.demand === "Very High" ? "default" : "secondary"}
                        className="mb-1"
                      >
                        {skill.demand}
                      </Badge>
                      <p className="text-sm text-success font-medium">+{skill.growth}%</p>
                    </div>
                  </div>
                  <Progress value={skill.growth} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Job Market Trends */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Job Market Trends
              </CardTitle>
              <CardDescription>
                Current job openings and market demand by role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketData.jobMarketTrends.map((job) => (
                <div key={job.role} className="bg-accent p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{job.role}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {job.openings.toLocaleString()} jobs
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {job.avgSalary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {job.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
                      {job.trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
                      <span className={`text-sm font-medium ${
                        job.trend === "up" ? "text-success" : 
                        job.trend === "down" ? "text-destructive" : "text-muted-foreground"
                      }`}>
                        +{job.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.locations.map((location) => (
                      <Badge key={location} variant="outline" className="text-xs">
                        <MapPin className="h-2 w-2 mr-1" />
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Industry Insights */}
        <div className="mt-8">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent-foreground" />
                Industry Growth Insights
              </CardTitle>
              <CardDescription>
                Key drivers and risk factors across major industries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {marketData.industryInsights.map((industry) => (
                  <div key={industry.industry} className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold">{industry.industry}</h4>
                      <div className="text-2xl font-bold text-success mt-1">{industry.growth}</div>
                      <p className="text-sm text-muted-foreground">YoY Growth</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-success">Growth Drivers</h5>
                        <div className="space-y-1">
                          {industry.keyDrivers.map((driver) => (
                            <Badge key={driver} variant="outline" className="text-xs mr-1 mb-1 bg-success/10 text-success border-success/20">
                              {driver}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-warning">Risk Factors</h5>
                        <div className="space-y-1">
                          {industry.riskFactors.map((risk) => (
                            <Badge key={risk} variant="outline" className="text-xs mr-1 mb-1 bg-warning/10 text-warning border-warning/20">
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};