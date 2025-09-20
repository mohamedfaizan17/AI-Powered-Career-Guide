import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
} else {
  console.log('Gemini API key found, initializing AI service...');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Types for our AI service
export interface UserProfile {
  skills: Array<{ name: string; level: number }>;
  interests: string[];
  experience: string;
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  match?: number; // For compatibility with existing component
  requiredSkills: string[];
  salaryRange: string;
  salary?: string; // For compatibility
  growthProspects: string;
  growth?: string; // For compatibility
  learningPath: string[];
  skillGaps?: string[];
  companies?: string[];
  jobLocations?: string[];
  marketDemand?: string;
  nextSteps?: string[];
  geminiInsights?: {
    reasoningScore: number;
    marketFit: string;
    riskFactors: string[];
    keyAdvantages: string[];
  };
}

export interface LearningRecommendation {
  skill: string;
  courses: Array<{
    title: string;
    provider: string;
    duration: string;
    difficulty: string;
    description: string;
  }>;
}

// Generate career recommendations using Gemini AI
export const generateCareerRecommendations = async (
  userProfile: UserProfile
): Promise<CareerRecommendation[]> => {
  console.log('Generating career recommendations for:', userProfile);
  
  if (!genAI) {
    console.log('No Gemini AI instance, using fallback recommendations');
    return getFallbackCareerRecommendations(userProfile);
  }

  try {
    console.log('Calling Gemini AI API...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Based on the following user profile, provide 5 personalized career recommendations in JSON format:

User Profile:
- Skills: ${userProfile.skills.map(s => `${s.name} (Level ${s.level}/5)`).join(', ')}
- Interests: ${userProfile.interests.join(', ')}
- Experience Level: ${userProfile.experience}

Please provide recommendations as a JSON array with this exact structure:
[
  {
    "title": "Job Title",
    "description": "Brief description of the role and responsibilities",
    "matchScore": 85,
    "match": 85,
    "requiredSkills": ["skill1", "skill2", "skill3"],
    "salaryRange": "$60,000 - $90,000",
    "salary": "$60,000 - $90,000",
    "growthProspects": "Description of career growth opportunities",
    "growth": "+15% (5 year)",
    "learningPath": ["Next skill to learn", "Advanced skill", "Leadership skill"],
    "skillGaps": ["skill to learn", "another skill"],
    "companies": ["Company 1", "Company 2", "Company 3"],
    "jobLocations": ["City 1", "City 2", "Remote"],
    "marketDemand": "High",
    "nextSteps": ["Step 1", "Step 2", "Step 3"],
    "geminiInsights": {
      "reasoningScore": 85,
      "marketFit": "Strong match description",
      "riskFactors": ["Risk 1", "Risk 2"],
      "keyAdvantages": ["Advantage 1", "Advantage 2"]
    }
  }
]

Focus on:
1. Matching user's current skills and interests
2. Realistic career progression based on experience level
3. Current market demand and salary ranges
4. Specific learning paths for career advancement
5. Match scores between 70-95 based on profile alignment

Return only the JSON array, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Gemini AI response received:', text.substring(0, 200) + '...');

    // Parse the JSON response
    try {
      // Clean the response text (remove any markdown formatting)
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const recommendations = JSON.parse(cleanText);
      
      if (Array.isArray(recommendations)) {
        console.log('Successfully parsed AI recommendations:', recommendations.length, 'items');
        return recommendations;
      } else {
        console.log('AI response is not an array, using fallback');
        return getFallbackCareerRecommendations(userProfile);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw response:', text);
      return getFallbackCareerRecommendations(userProfile);
    }
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    return getFallbackCareerRecommendations(userProfile);
  }
};

// Generate learning recommendations using Gemini AI
export const generateLearningRecommendations = async (
  userProfile: UserProfile
): Promise<LearningRecommendation[]> => {
  if (!genAI) {
    return getFallbackLearningRecommendations(userProfile);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Based on the user's profile, recommend learning paths to advance their career:

User Profile:
- Current Skills: ${userProfile.skills.map(s => `${s.name} (Level ${s.level}/5)`).join(', ')}
- Interests: ${userProfile.interests.join(', ')}
- Experience Level: ${userProfile.experience}

Provide 3-5 learning recommendations in JSON format:
[
  {
    "skill": "Skill Name",
    "courses": [
      {
        "title": "Course Title",
        "provider": "Platform/University",
        "duration": "4-6 weeks",
        "difficulty": "Beginner/Intermediate/Advanced",
        "description": "What you'll learn in this course"
      }
    ]
  }
]

Focus on:
1. Skills that complement their current abilities
2. High-demand skills in their interest areas
3. Progressive learning paths from their current level
4. Mix of technical and soft skills
5. Realistic course recommendations from known platforms

Return only the JSON array, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const recommendations = JSON.parse(text);
      return Array.isArray(recommendations) ? recommendations : getFallbackLearningRecommendations(userProfile);
    } catch (parseError) {
      console.error('Error parsing learning recommendations:', parseError);
      return getFallbackLearningRecommendations(userProfile);
    }
  } catch (error) {
    console.error('Error generating learning recommendations:', error);
    return getFallbackLearningRecommendations(userProfile);
  }
};

// Generate market intelligence using Gemini AI
export const generateMarketIntelligence = async (
  userProfile: UserProfile
): Promise<{
  trends: string[];
  opportunities: string[];
  salaryInsights: string;
  skillDemand: Array<{ skill: string; demand: 'High' | 'Medium' | 'Low'; trend: 'Rising' | 'Stable' | 'Declining' }>;
}> => {
  if (!genAI) {
    return getFallbackMarketIntelligence(userProfile);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Provide market intelligence for someone with this profile:

Skills: ${userProfile.skills.map(s => s.name).join(', ')}
Interests: ${userProfile.interests.join(', ')}
Experience: ${userProfile.experience}

Return JSON with this structure:
{
  "trends": ["Current industry trend 1", "Current industry trend 2", "Current industry trend 3"],
  "opportunities": ["Emerging opportunity 1", "Emerging opportunity 2", "Emerging opportunity 3"],
  "salaryInsights": "Brief overview of salary trends in their field",
  "skillDemand": [
    {
      "skill": "Skill Name",
      "demand": "High",
      "trend": "Rising"
    }
  ]
}

Focus on current 2024-2025 market conditions and realistic insights.
Return only JSON, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing market intelligence:', parseError);
      return getFallbackMarketIntelligence(userProfile);
    }
  } catch (error) {
    console.error('Error generating market intelligence:', error);
    return getFallbackMarketIntelligence(userProfile);
  }
};

// Fallback functions for when AI is not available
const getFallbackCareerRecommendations = (userProfile: UserProfile): CareerRecommendation[] => {
  const recommendations: CareerRecommendation[] = [
    {
      title: "Software Developer",
      description: "Design and develop software applications using modern programming languages and frameworks.",
      matchScore: 85,
      match: 85,
      requiredSkills: ["JavaScript", "React", "Node.js", "SQL"],
      salaryRange: "$70,000 - $120,000",
      salary: "$70,000 - $120,000",
      growthProspects: "High demand with opportunities to advance to senior developer, tech lead, or architect roles.",
      growth: "+15% (5 year)",
      learningPath: ["Advanced JavaScript", "System Design", "Cloud Platforms", "Leadership Skills"],
      skillGaps: ["System Design", "Cloud Platforms"],
      companies: ["Microsoft", "Google", "Meta", "Amazon"],
      jobLocations: ["Seattle", "San Francisco", "New York", "Remote"],
      marketDemand: "Very High",
      nextSteps: ["Build portfolio projects", "Learn system design", "Practice coding interviews"],
      geminiInsights: {
        reasoningScore: 85,
        marketFit: "Strong - High demand for full-stack developers",
        riskFactors: ["Competitive market", "Need continuous learning"],
        keyAdvantages: ["Strong technical foundation", "Versatile skill set"]
      }
    },
    {
      title: "Data Analyst",
      description: "Analyze data to help organizations make informed business decisions.",
      matchScore: 78,
      match: 78,
      requiredSkills: ["Python", "SQL", "Data Analysis", "Machine Learning"],
      salaryRange: "$60,000 - $95,000",
      salary: "$60,000 - $95,000",
      growthProspects: "Growing field with paths to data scientist, analytics manager, or business intelligence roles.",
      growth: "+25% (5 year)",
      learningPath: ["Advanced Analytics", "Machine Learning", "Business Intelligence", "Data Visualization"],
      skillGaps: ["Advanced Statistics", "Machine Learning"],
      companies: ["Netflix", "Spotify", "Airbnb", "Uber"],
      jobLocations: ["San Francisco", "New York", "Austin", "Remote"],
      marketDemand: "High",
      nextSteps: ["Build data portfolio", "Learn advanced ML", "Get certified in analytics tools"],
      geminiInsights: {
        reasoningScore: 78,
        marketFit: "Good - Growing demand for data-driven insights",
        riskFactors: ["Need strong math background", "Evolving tools"],
        keyAdvantages: ["Analytical thinking", "Problem-solving skills"]
      }
    },
    {
      title: "Product Manager",
      description: "Guide product development from conception to launch, working with cross-functional teams.",
      matchScore: 72,
      match: 72,
      requiredSkills: ["Project Management", "Communication", "Leadership", "Data Analysis"],
      salaryRange: "$90,000 - $150,000",
      salary: "$90,000 - $150,000",
      growthProspects: "Excellent growth potential to senior PM, director, or VP of product roles.",
      growth: "+20% (5 year)",
      learningPath: ["Product Strategy", "User Research", "Agile Methodologies", "Strategic Planning"],
      skillGaps: ["Product Strategy", "User Research"],
      companies: ["Apple", "Google", "Meta", "Stripe"],
      jobLocations: ["Silicon Valley", "Seattle", "New York", "Remote"],
      marketDemand: "High",
      nextSteps: ["Build product case studies", "Network with PMs", "Get PM certification"],
      geminiInsights: {
        reasoningScore: 72,
        marketFit: "Good - Strong demand for technical PMs",
        riskFactors: ["Requires business acumen", "Competitive field"],
        keyAdvantages: ["Leadership potential", "Cross-functional skills"]
      }
    }
  ];

  return recommendations;
};

const getFallbackLearningRecommendations = (userProfile: UserProfile): LearningRecommendation[] => {
  return [
    {
      skill: "Advanced JavaScript",
      courses: [
        {
          title: "JavaScript: The Advanced Concepts",
          provider: "Udemy",
          duration: "6-8 weeks",
          difficulty: "Advanced",
          description: "Master closures, prototypes, async programming, and modern ES6+ features"
        }
      ]
    },
    {
      skill: "Cloud Computing",
      courses: [
        {
          title: "AWS Certified Solutions Architect",
          provider: "AWS Training",
          duration: "8-10 weeks",
          difficulty: "Intermediate",
          description: "Learn to design and deploy scalable systems on AWS"
        }
      ]
    }
  ];
};

const getFallbackMarketIntelligence = (userProfile: UserProfile) => {
  return {
    trends: [
      "AI and Machine Learning integration across industries",
      "Remote and hybrid work models becoming standard",
      "Increased focus on cybersecurity and data privacy"
    ],
    opportunities: [
      "AI/ML Engineer roles growing rapidly",
      "DevOps and Cloud Engineering in high demand",
      "Product Management roles expanding in tech companies"
    ],
    salaryInsights: "Technology roles continue to offer competitive salaries with 5-10% year-over-year growth in most markets.",
    skillDemand: [
      { skill: "Python", demand: "High" as const, trend: "Rising" as const },
      { skill: "React", demand: "High" as const, trend: "Stable" as const },
      { skill: "Machine Learning", demand: "High" as const, trend: "Rising" as const }
    ]
  };
};
