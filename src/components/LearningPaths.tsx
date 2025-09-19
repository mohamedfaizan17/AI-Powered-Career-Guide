import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Trophy,
  Users,
  AlertCircle,
  ExternalLink
} from "lucide-react";

// Mock learning paths - In production, integrated with course APIs
const learningPaths = {
  "AI/ML Engineer": {
    duration: "6-8 months",
    difficulty: "Advanced",
    courses: [
      {
        id: 1,
        title: "Machine Learning Fundamentals",
        provider: "Coursera",
        duration: "6 weeks",
        rating: 4.8,
        enrolled: 125000,
        completed: false,
        skills: ["Python", "Statistics", "Linear Algebra"],
        description: "Introduction to ML algorithms and mathematical foundations"
      },
      {
        id: 2,
        title: "Deep Learning Specialization",
        provider: "Coursera",
        duration: "4 months",
        rating: 4.9,
        enrolled: 89000,
        completed: false,
        skills: ["Neural Networks", "TensorFlow", "Computer Vision"],
        description: "Comprehensive deep learning from Andrew Ng"
      },
      {
        id: 3,
        title: "MLOps Engineering",
        provider: "edX",
        duration: "8 weeks",
        rating: 4.6,
        enrolled: 34000,
        completed: false,
        skills: ["Docker", "Kubernetes", "Model Deployment"],
        description: "Production ML systems and deployment strategies"
      }
    ]
  },
  "Full Stack Developer": {
    duration: "4-6 months",
    difficulty: "Intermediate",
    courses: [
      {
        id: 4,
        title: "React - The Complete Guide",
        provider: "Udemy",
        duration: "12 weeks",
        rating: 4.7,
        enrolled: 245000,
        completed: true,
        skills: ["React", "JavaScript", "State Management"],
        description: "Master React with hooks, context, and modern patterns"
      },
      {
        id: 5,
        title: "Node.js Backend Development",
        provider: "YouTube",
        duration: "8 weeks",
        rating: 4.5,
        enrolled: 78000,
        completed: false,
        skills: ["Node.js", "Express", "MongoDB"],
        description: "Build scalable backend APIs and services"
      },
      {
        id: 6,
        title: "Cloud Deployment & DevOps",
        provider: "AWS Training",
        duration: "6 weeks",
        rating: 4.8,
        enrolled: 56000,
        completed: false,
        skills: ["AWS", "Docker", "CI/CD"],
        description: "Deploy and scale applications in the cloud"
      }
    ]
  }
};

const supplementaryContent = [
  {
    type: "Article",
    title: "2024 AI Career Roadmap",
    source: "Medium",
    readTime: "8 min",
    rating: 4.6
  },
  {
    type: "Video",
    title: "System Design Interview Prep",
    source: "YouTube",
    readTime: "45 min",
    rating: 4.8
  },
  {
    type: "Podcast",
    title: "Tech Career Growth Strategies",
    source: "Spotify",
    readTime: "32 min",
    rating: 4.7
  }
];

interface LearningPathsProps {
  userSkills?: Array<{ name: string; level: number }>;
}

export const LearningPaths = ({ userSkills = [] }: LearningPathsProps) => {
  const [selectedPath, setSelectedPath] = useState<string>("AI/ML Engineer");

  const calculateProgress = (pathKey: string) => {
    const path = learningPaths[pathKey as keyof typeof learningPaths];
    const completedCourses = path.courses.filter(course => course.completed).length;
    return (completedCourses / path.courses.length) * 100;
  };

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Personalized Learning Paths</h1>
          <p className="text-xl text-muted-foreground">
            AI-curated learning journeys tailored to your career goals and current skills
          </p>
        </div>

        {/* API Integration Notice */}
        <Card className="mb-8 border-warning/20 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Enhanced Learning Integration</h3>
                <p className="text-muted-foreground mb-3">
                  Currently showing curated content. Connect to Supabase to integrate with Coursera API, 
                  edX API, YouTube Data API, and Medium API for real-time course recommendations and progress tracking.
                </p>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Requires Supabase Integration
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedPath} onValueChange={setSelectedPath} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            {Object.keys(learningPaths).map((pathKey) => (
              <TabsTrigger key={pathKey} value={pathKey} className="text-center">
                <div>
                  <div className="font-medium">{pathKey}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculateProgress(pathKey).toFixed(0)}% Complete
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(learningPaths).map(([pathKey, pathData]) => (
            <TabsContent key={pathKey} value={pathKey} className="space-y-6">
              {/* Path Overview */}
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{pathKey} Learning Path</CardTitle>
                      <CardDescription className="mt-2">
                        Complete roadmap to become a {pathKey.toLowerCase()} with industry-relevant skills
                      </CardDescription>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {pathData.difficulty}
                      </Badge>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {pathData.duration}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{calculateProgress(pathKey).toFixed(0)}%</span>
                    </div>
                    <Progress value={calculateProgress(pathKey)} className="h-2" />
                  </div>
                </CardHeader>
              </Card>

              {/* Course List */}
              <div className="space-y-4">
                {pathData.courses.map((course, index) => (
                  <Card key={course.id} className="shadow-medium">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            course.completed 
                              ? "bg-success text-success-foreground" 
                              : "bg-primary text-primary-foreground"
                          }`}>
                            {course.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                            <p className="text-muted-foreground mb-3">{course.description}</p>
                            
                            <div className="flex items-center gap-4 mb-3">
                              <Badge variant="outline">{course.provider}</Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {course.duration}
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-yellow-500" />
                                {course.rating}
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {course.enrolled.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {course.skills.map((skill) => (
                                <Badge 
                                  key={skill} 
                                  variant="secondary"
                                  className={
                                    userSkills.some(s => s.name === skill) 
                                      ? "bg-success/20 text-success" 
                                      : ""
                                  }
                                >
                                  {skill}
                                  {userSkills.some(s => s.name === skill) && (
                                    <CheckCircle className="h-3 w-3 ml-1" />
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {course.completed ? (
                            <Button variant="outline" size="sm" className="text-success border-success">
                              <Trophy className="h-4 w-4 mr-2" />
                              Completed
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-gradient-primary">
                              <Play className="h-4 w-4 mr-2" />
                              Start Course
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Supplementary Content */}
        <Card className="mt-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Supplementary Learning Content
            </CardTitle>
            <CardDescription>
              Additional resources to complement your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {supplementaryContent.map((content, index) => (
                <div key={index} className="bg-accent p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {content.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      {content.rating}
                    </div>
                  </div>
                  <h4 className="font-medium mb-1">{content.title}</h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{content.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {content.readTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};