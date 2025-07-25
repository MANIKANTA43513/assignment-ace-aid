import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Calendar, Star, FileText, Download } from "lucide-react";

interface HistoricalRecord {
  id: string;
  fileName: string;
  uploadDate: string;
  rating: number;
  name: string;
  email: string;
  analysisId: string;
}

// Mock data for demonstration
const mockHistoricalData: HistoricalRecord[] = [
  {
    id: "1",
    fileName: "John_Doe_Resume_v3.pdf",
    uploadDate: "2024-01-15",
    rating: 8.5,
    name: "John Doe",
    email: "john.doe@email.com",
    analysisId: "analysis_001"
  },
  {
    id: "2",
    fileName: "John_Doe_Resume_v2.pdf",
    uploadDate: "2024-01-10",
    rating: 7.2,
    name: "John Doe",
    email: "john.doe@email.com",
    analysisId: "analysis_002"
  },
  {
    id: "3",
    fileName: "John_Doe_Resume_v1.pdf",
    uploadDate: "2024-01-05",
    rating: 6.8,
    name: "John Doe",
    email: "john.doe@email.com",
    analysisId: "analysis_003"
  },
  {
    id: "4",
    fileName: "Sarah_Smith_Resume.pdf",
    uploadDate: "2024-01-12",
    rating: 9.1,
    name: "Sarah Smith",
    email: "sarah.smith@email.com",
    analysisId: "analysis_004"
  }
];

interface DetailedAnalysis {
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

export const HistoricalViewer = () => {
  const [selectedRecord, setSelectedRecord] = useState<HistoricalRecord | null>(null);
  const [detailedAnalysis, setDetailedAnalysis] = useState<DetailedAnalysis | null>(null);

  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 8) return "default";
    if (rating >= 6) return "secondary";
    return "destructive";
  };

  const handleViewDetails = (record: HistoricalRecord) => {
    setSelectedRecord(record);
    
    // Mock detailed analysis data
    const mockDetailedData: DetailedAnalysis = {
      personalDetails: {
        name: record.name,
        email: record.email,
        phone: "+1 (555) 123-4567",
        linkedin: "linkedin.com/in/johndoe",
        portfolio: "johndoe.dev"
      },
      resumeContent: {
        summary: "Experienced professional with strong background in technology",
        workExperience: [
          "Senior Software Engineer at TechCorp (2021-Present)",
          "Software Engineer at StartupXYZ (2019-2021)"
        ],
        education: [
          "Bachelor of Science in Computer Science - University of Technology (2018)"
        ],
        projects: [
          "E-commerce Platform - React, Node.js, PostgreSQL",
          "Task Management App - Vue.js, Express, MongoDB"
        ],
        certifications: [
          "AWS Certified Solutions Architect",
          "Google Cloud Professional Developer"
        ]
      },
      skills: {
        technical: ["JavaScript", "React", "Node.js", "Python", "PostgreSQL"],
        soft: ["Leadership", "Communication", "Problem Solving"]
      },
      feedback: {
        rating: record.rating,
        improvementAreas: [
          "Add more quantifiable achievements",
          "Include specific metrics and results"
        ],
        skillsToLearn: [
          "Docker & Kubernetes",
          "GraphQL",
          "Machine Learning"
        ]
      }
    };
    
    setDetailedAnalysis(mockDetailedData);
  };

  return (
    <div className="space-y-6">
      {mockHistoricalData.length === 0 ? (
        <Card className="border-0 shadow-card">
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Analysis History</h3>
            <p className="text-muted-foreground">
              Upload and analyze your first resume to see historical data here
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Resume Analysis History
            </CardTitle>
            <CardDescription>
              View and compare your previous resume analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHistoricalData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {record.fileName}
                      </div>
                    </TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>
                      {new Date(record.uploadDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRatingBadgeVariant(record.rating)}>
                        <Star className="h-3 w-3 mr-1" />
                        {record.rating}/10
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(record)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Analysis Details - {record.fileName}
                              </DialogTitle>
                              <DialogDescription>
                                Detailed analysis results from {new Date(record.uploadDate).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {detailedAnalysis && (
                              <div className="space-y-6 mt-4">
                                {/* Rating Overview */}
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                  <div className="text-2xl font-bold text-primary mb-1">
                                    {detailedAnalysis.feedback.rating}/10
                                  </div>
                                  <p className="text-sm text-muted-foreground">Overall Score</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Personal Details */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Personal Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <p><span className="font-medium">Name:</span> {detailedAnalysis.personalDetails.name}</p>
                                      <p><span className="font-medium">Email:</span> {detailedAnalysis.personalDetails.email}</p>
                                      <p><span className="font-medium">Phone:</span> {detailedAnalysis.personalDetails.phone}</p>
                                    </div>
                                  </div>

                                  {/* Skills */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Skills</h4>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-sm font-medium mb-2">Technical:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {detailedAnalysis.skills.technical.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium mb-2">Soft Skills:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {detailedAnalysis.skills.soft.map((skill, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Feedback */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold mb-3 text-warning">Improvement Areas</h4>
                                    <ul className="space-y-2">
                                      {detailedAnalysis.feedback.improvementAreas.map((area, index) => (
                                        <li key={index} className="text-sm flex items-start gap-2">
                                          <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                                          {area}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-3 text-primary">Recommended Skills</h4>
                                    <ul className="space-y-2">
                                      {detailedAnalysis.feedback.skillsToLearn.map((skill, index) => (
                                        <li key={index} className="text-sm flex items-start gap-2">
                                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                          {skill}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};