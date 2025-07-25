import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
}

export const FileUploadZone = ({ onFileUpload }: FileUploadZoneProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <Card 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-card",
          isDragActive 
            ? "border-primary bg-accent/50 shadow-elegant" 
            : "border-border hover:border-primary/50",
          selectedFile && "border-success"
        )}
      >
        <CardContent className="p-12 text-center">
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "p-4 rounded-full transition-colors",
              isDragActive 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              <Upload className="h-8 w-8" />
            </div>
            
            {isDragActive ? (
              <div>
                <p className="text-lg font-semibold text-primary">Drop your resume here</p>
                <p className="text-muted-foreground">Release to upload your PDF file</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold mb-2">
                  Drag & drop your resume here
                </p>
                <p className="text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <Button variant="secondary" className="font-medium">
                  Browse Files
                </Button>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground">
              Supports PDF files up to 10MB
            </p>
          </div>
        </CardContent>
      </Card>

      {selectedFile && (
        <Card className="border border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <FileText className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleUpload}
                  className="bg-gradient-primary hover:bg-primary-hover font-medium shadow-elegant"
                >
                  Analyze Resume
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};