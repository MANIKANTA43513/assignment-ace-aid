import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploadZone } from "./FileUploadZone";
import { AnalysisResults } from "./AnalysisResults";
import { HistoricalViewer } from "./HistoricalViewer";
import { Upload, History, Brain } from "lucide-react";

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

export const ResumeAnalyzer = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate API call - In real implementation, this would call your backend
    setTimeout(() => {
      const mockData: AnalysisData = {
        personalDetails: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          linkedin: "linkedin.com/in/johndoe",
          portfolio: "johndoe.dev"
        },
        resumeContent: {
          summary: "Experienced software developer with 5+ years in full-stack development",
          workExperience: [
            "Senior Software Engineer at TechCorp (2021-Present)",
            "Full Stack Developer at StartupXYZ (2019-2021)",
            "Junior Developer at WebSolutions (2018-2019)"
          ],
          education: [
            "Bachelor of Science in Computer Science - University of Technology (2018)"
          ],
          projects: [
            "E-commerce Platform - React, Node.js, PostgreSQL",
            "Task Management App - Vue.js, Express, MongoDB",
            "Data Analytics Dashboard - Python, Flask, D3.js"
          ],
          certifications: [
            "AWS Certified Solutions Architect",
            "Google Cloud Professional Developer"
          ]
        },
        skills: {
          technical: ["JavaScript", "React", "Node.js", "Python", "PostgreSQL", "AWS"],
          soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"]
        },
        feedback: {
          rating: 8.5,
          improvementAreas: [
            "Add more quantifiable achievements",
            "Include specific metrics and results",
            "Strengthen project descriptions"
          ],
          skillsToLearn: [
            "Docker & Kubernetes",
            "GraphQL",
            "Machine Learning",
            "System Design"
          ]
        }
      };
      
      setAnalysisData(mockData);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-elegant">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Resume Analyzer
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and get AI-powered analysis with personalized feedback for improvement
            </p>
          </div>

          {/* Main Content */}
          <Card className="shadow-elegant border-0 bg-gradient-card">
            <CardContent className="p-0">
              <Tabs defaultValue="analysis" className="w-full">
                <div className="border-b border-border/50">
                  <TabsList className="grid w-full grid-cols-2 bg-transparent h-16 p-1">
                    <TabsTrigger 
                      value="analysis" 
                      className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
                    >
                      <Upload className="h-5 w-5" />
                      Live Resume Analysis
                    </TabsTrigger>
                    <TabsTrigger 
                      value="history" 
                      className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
                    >
                      <History className="h-5 w-5" />
                      Historical Viewer
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="analysis" className="p-6 space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Upload & Analyze Your Resume</h2>
                    <p className="text-muted-foreground">
                      Get instant AI-powered feedback on your resume with detailed improvement suggestions
                    </p>
                  </div>
                  
                  {!analysisData && !isAnalyzing && (
                    <FileUploadZone onFileUpload={handleFileUpload} />
                  )}
                  
                  {isAnalyzing && (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <h3 className="text-lg font-semibold mb-2">Analyzing Your Resume</h3>
                      <p className="text-muted-foreground">
                        Our AI is processing your resume and generating insights...
                      </p>
                    </div>
                  )}
                  
                  {analysisData && !isAnalyzing && (
                    <AnalysisResults 
                      data={analysisData} 
                      onNewAnalysis={() => {
                        setAnalysisData(null);
                        setIsAnalyzing(false);
                      }}
                    />
                  )}
                </TabsContent>

                <TabsContent value="history" className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Previous Analyses</h2>
                    <p className="text-muted-foreground">
                      View and compare your previous resume analyses
                    </p>
                  </div>
                  <HistoricalViewer />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};