import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  Star, 
  TrendingUp, 
  BookOpen,
  Upload,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Users
} from "lucide-react";

interface AnalysisData {
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;
  };
  resumeContent: {
    summary: string;
    workExperience: string[];
    education: string[];
    projects: string[];
    certifications: string[];
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  feedback: {
    rating: number;
    improvementAreas: string[];
    skillsToLearn: string[];
  };
}

interface AnalysisResultsProps {
  data: AnalysisData;
  onNewAnalysis: () => void;
}

export const AnalysisResults = ({ data, onNewAnalysis }: AnalysisResultsProps) => {
  const ratingColor = data.feedback.rating >= 8 ? "success" : 
                     data.feedback.rating >= 6 ? "warning" : "destructive";

  return (
    <div className="space-y-6">
      {/* Header with New Analysis Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Analysis Results</h3>
        <Button onClick={onNewAnalysis} variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Analyze New Resume
        </Button>
      </div>

      {/* Overall Rating */}
      <Card className="border-0 shadow-card bg-gradient-card">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <Star className="h-6 w-6 text-warning" />
            Overall Resume Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <div className="text-4xl font-bold text-primary">
              {data.feedback.rating}/10
            </div>
            <Progress 
              value={data.feedback.rating * 10} 
              className="h-3 w-full max-w-md mx-auto"
            />
            <p className="text-muted-foreground">
              {data.feedback.rating >= 8 ? "Excellent resume!" : 
               data.feedback.rating >= 6 ? "Good resume with room for improvement" : 
               "Needs significant improvements"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{data.personalDetails.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{data.personalDetails.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{data.personalDetails.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <span>{data.personalDetails.linkedin}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{data.personalDetails.portfolio}</span>
            </div>
          </CardContent>
        </Card>

        {/* Skills Analysis */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Skills Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.resumeContent.workExperience.map((exp, index) => (
                <li key={index} className="text-sm">{exp}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Education</h4>
              <ul className="space-y-1">
                {data.resumeContent.education.map((edu, index) => (
                  <li key={index} className="text-sm">{edu}</li>
                ))}
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Certifications</h4>
              <div className="space-y-1">
                {data.resumeContent.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-warning" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>
              AI-identified suggestions to enhance your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.feedback.improvementAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recommended Skills
            </CardTitle>
            <CardDescription>
              Skills to learn to boost your career prospects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.feedback.skillsToLearn.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};