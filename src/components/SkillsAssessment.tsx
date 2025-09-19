import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Plus, Check } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillsAssessmentProps {
  onComplete: (data: { skills: Skill[]; interests: string[]; experience: string }) => void;
}

const suggestedSkills = [
  "JavaScript", "Python", "React", "Node.js", "SQL", "Machine Learning",
  "Project Management", "Communication", "Leadership", "Data Analysis",
  "Digital Marketing", "UI/UX Design", "Cloud Computing", "Agile"
];

const interestAreas = [
  "Technology", "Healthcare", "Finance", "Education", "Marketing",
  "Design", "Sales", "Operations", "Research", "Consulting"
];

export const SkillsAssessment = ({ onComplete }: SkillsAssessmentProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [experience, setExperience] = useState("");

  const addSkill = (skillName: string) => {
    if (skillName && !skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      setSkills([...skills, { name: skillName, level: 3 }]);
      setNewSkill("");
    }
  };

  const updateSkillLevel = (skillName: string, level: number) => {
    setSkills(skills.map(s => s.name === skillName ? { ...s, level } : s));
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter(s => s.name !== skillName));
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    onComplete({ skills, interests, experience });
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Tell Us About Yourself
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help our AI understand your skills, interests, and experience to provide 
            the most accurate career recommendations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Skills Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                Your Skills
              </CardTitle>
              <CardDescription>
                Add your current skills and rate your proficiency level (1-5)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                />
                <Button onClick={() => addSkill(newSkill)} disabled={!newSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant={skills.find(s => s.name === skill) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="bg-accent p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">{skill.name}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skill.name)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Progress value={skill.level * 20} className="h-2" />
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Button
                            key={level}
                            variant={skill.level >= level ? "default" : "outline"}
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => updateSkillLevel(skill.name, level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {skill.level === 1 && "Beginner"}
                        {skill.level === 2 && "Basic"}
                        {skill.level === 3 && "Intermediate"}
                        {skill.level === 4 && "Advanced"}
                        {skill.level === 5 && "Expert"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interests Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                Your Interests
              </CardTitle>
              <CardDescription>
                Select the industries and areas that interest you most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestAreas.map((interest) => (
                  <Button
                    key={interest}
                    variant={interests.includes(interest) ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interests.includes(interest) && <Check className="h-4 w-4 mr-2" />}
                    {interest}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                Experience Level
              </CardTitle>
              <CardDescription>
                What best describes your current experience level?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Student/Graduate", "Entry Level (0-2 years)", "Mid Level (3-5 years)", "Senior Level (6+ years)"].map((level) => (
                  <Button
                    key={level}
                    variant={experience === level ? "default" : "outline"}
                    className="justify-start h-auto p-4"
                    onClick={() => setExperience(level)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{level}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={handleSubmit}
              disabled={skills.length === 0 || interests.length === 0 || !experience}
              size="lg"
              className="bg-gradient-primary hover:bg-primary-hover shadow-medium"
            >
              Get My Career Recommendations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};