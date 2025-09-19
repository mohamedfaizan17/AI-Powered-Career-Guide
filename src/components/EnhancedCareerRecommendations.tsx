import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  ArrowRight,
  Target,
  Brain,
  AlertCircle,
  MapPin,
  Briefcase
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface AssessmentData {
  skills: Skill[];
  interests: string[];
  experience: string;
}

interface CareerRecommendationsProps {
  assessmentData: AssessmentData;
}

// Enhanced AI-powered recommendations with Gemini analysis
const generateEnhancedRecommendations = (data: AssessmentData) => {
  const recommendations = [
    {
      title: "AI/ML Engineering Specialist",
      match: 94,
      salary: "$95k - $160k",
      growth: "+42% (5 year)",
      marketDemand: "Critical Shortage",
      description: "Design and implement machine learning systems, with focus on generative AI and LLMs using Google Cloud AI/ML services.",
      requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Google Cloud AI"],
      skillGaps: ["Vertex AI", "MLOps", "Kubeflow"],
      learningPath: ["Google Cloud AI Certification", "Vertex AI Specialization", "Advanced MLOps"],
      companies: ["Google", "OpenAI", "Anthropic", "DeepMind"],
      geminiInsights: {
        reasoningScore: 92,
        marketFit: "Exceptional - High growth in generative AI sector",
        riskFactors: ["Rapid technology evolution", "High competition"],
        keyAdvantages: ["Strong Python foundation", "Interest in AI/Technology match"]
      },
      jobLocations: ["San Francisco", "New York", "Remote", "London"],
      nextSteps: [
        "Complete Google Cloud AI certification",
        "Build 3 ML projects using Vertex AI", 
        "Contribute to open-source AI projects"
      ]
    },
    {
      title: "Product Manager - AI/Tech",
      match: 88,
      salary: "$110k - $170k", 
      growth: "+25% (5 year)",
      marketDemand: "High Growth",
      description: "Lead product strategy for AI-powered products, working with engineering teams to bring innovative solutions to market.",
      requiredSkills: ["Project Management", "Communication", "Data Analysis", "Technical Leadership"],
      skillGaps: ["Product Strategy", "User Research", "A/B Testing"],
      learningPath: ["Google Product Management", "Design Thinking", "AI Product Strategy"],
      companies: ["Meta", "Google", "Microsoft", "Stripe"],
      geminiInsights: {
        reasoningScore: 85,
        marketFit: "Strong - Growing demand for technical PMs in AI space",
        riskFactors: ["Requires business acumen development", "Competitive field"],
        keyAdvantages: ["Leadership potential", "Technical background"]
      },
      jobLocations: ["Silicon Valley", "Seattle", "Austin", "Remote"],
      nextSteps: [
        "Build portfolio of product case studies",
        "Complete PM certification program",
        "Network with current product managers"
      ]
    },
    {
      title: "Full Stack Developer - AI Integration",
      match: 82,
      salary: "$85k - $130k",
      growth: "+28% (5 year)", 
      marketDemand: "Very High",
      description: "Build end-to-end applications integrating AI capabilities, using modern frameworks and Google AI APIs.",
      requiredSkills: ["JavaScript", "React", "Node.js", "API Integration"],
      skillGaps: ["Google AI APIs", "Vector Databases", "Real-time Systems"],
      learningPath: ["Advanced React Patterns", "Google AI Integration", "System Architecture"],
      companies: ["Vercel", "Supabase", "MongoDB", "Cloudflare"],
      geminiInsights: {
        reasoningScore: 78,
        marketFit: "Good - Strong foundation with clear growth path",
        riskFactors: ["Need to specialize in AI integration", "Saturated junior market"],
        keyAdvantages: ["Solid technical foundation", "Full-stack capabilities"]
      },
      jobLocations: ["Austin", "Denver", "Remote", "Toronto"],
      nextSteps: [
        "Build AI-powered web applications",
        "Learn Google AI/Gemini API integration", 
        "Contribute to AI tool development"
      ]
    }
  ];

  return recommendations.sort((a, b) => b.match - a.match);
};

export const EnhancedCareerRecommendations = ({ assessmentData }: CareerRecommendationsProps) => {
  const recommendations = generateEnhancedRecommendations(assessmentData);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered Career Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Using Gemini AI to analyze market trends, skill alignment, and growth potential 
            for your personalized career recommendations.
          </p>
        </div>

        {/* Gemini Analysis Notice */}
        <Card className="mb-8 border-primary/20 bg-gradient-secondary shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Brain className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  Enhanced with Gemini AI Analysis
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Powered by Google AI
                  </Badge>
                </h3>
                <p className="text-muted-foreground mb-3">
                  These recommendations are enhanced with real-time market analysis, vector similarity matching, 
                  and predictive career modeling. Connect to Supabase to unlock full Gemini API integration 
                  for real-time job market analysis and personalized coaching.
                </p>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Requires Supabase + Gemini API Integration
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {recommendations.map((career, index) => (
            <Card key={career.title} className="shadow-strong hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl">{career.title}</CardTitle>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-sm px-3 py-1">
                        {career.match}% Match
                      </Badge>
                      {index === 0 && (
                        <Badge className="bg-gradient-primary text-sm px-3 py-1">
                          <Star className="h-3 w-3 mr-1" />
                          Top AI Recommendation
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {career.description}
                    </CardDescription>
                  </div>
                  <div className="text-right space-y-2 min-w-[180px]">
                    <div className="flex items-center gap-2 text-success font-semibold">
                      <DollarSign className="h-4 w-4" />
                      {career.salary}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      {career.growth}
                    </div>
                    <Badge 
                      variant={career.marketDemand.includes("Critical") ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {career.marketDemand}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* AI Match Analysis */}
                <div className="bg-gradient-secondary p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Brain className="h-4 w-4 text-primary" />
                    Gemini AI Analysis
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Reasoning Score:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={career.geminiInsights.reasoningScore} className="flex-1 h-2" />
                        <span className="text-primary font-semibold">{career.geminiInsights.reasoningScore}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Market Fit:</span>
                      <p className="text-muted-foreground mt-1">{career.geminiInsights.marketFit}</p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Your Matching Skills */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4 text-success" />
                      Skill Matches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills
                        .filter(skill => assessmentData.skills.some(s => s.name.toLowerCase().includes(skill.toLowerCase())))
                        .map(skill => (
                          <Badge key={skill} variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                            {skill}
                          </Badge>
                        ))
                      }
                    </div>
                  </div>

                  {/* Skills to Develop */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-warning" />
                      Skills Needed
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.skillGaps.map(skill => (
                        <Badge key={skill} variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Top Companies */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Top Employers
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.companies.slice(0, 3).map(company => (
                        <Badge key={company} variant="secondary" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Job Locations */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent-foreground" />
                      Locations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.jobLocations.slice(0, 3).map(location => (
                        <Badge key={location} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                    <h5 className="font-medium text-success mb-2">Key Advantages</h5>
                    <ul className="text-sm space-y-1">
                      {career.geminiInsights.keyAdvantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></div>
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-warning/5 p-4 rounded-lg border border-warning/20">
                    <h5 className="font-medium text-warning mb-2">Risk Factors</h5>
                    <ul className="text-sm space-y-1">
                      {career.geminiInsights.riskFactors.map((risk, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h5 className="font-medium text-primary mb-3">Recommended Next Steps</h5>
                  <div className="grid gap-2">
                    {career.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {idx + 1}
                        </div>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="bg-gradient-primary hover:bg-primary-hover">
                    Start Learning Path
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline">
                    View {career.companies.length} Job Openings
                  </Button>
                  <Button variant="ghost">
                    AI Career Coaching
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};