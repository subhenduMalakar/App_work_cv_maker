import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cvTemplates } from '@/data/cvData';
import { createNewCV } from '@/lib/cvUtils';
import { Eye, Check, ArrowRight } from 'lucide-react';

export default function Templates() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');
  
  const handleUseTemplate = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    
    // Create a new CV with the selected template
    const newCV = createNewCV(user.id, selectedTemplate);
    
    // Store in localStorage (in a real app, this would go to the database)
    const cvs = JSON.parse(localStorage.getItem('myCVs') || '[]');
    cvs.push(newCV);
    localStorage.setItem('myCVs', JSON.stringify(cvs));
    
    // Redirect to the builder
    router.push(`/builder?template=${selectedTemplate}&mode=create`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>CV Templates | CV Maker Pro</title>
      </Head>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Perfect CV Template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates to create a standout CV that catches employers' attention.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cvTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 shadow-md' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="relative">
                <img 
                  src={template.preview} 
                  alt={template.name}
                  className="w-full aspect-[3/4] object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button variant="secondary" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                
                <div className="flex justify-between items-center">
                  {selectedTemplate === template.id ? (
                    <Button onClick={handleUseTemplate} className="w-full">
                      Use This Template
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTemplate(template.id)}
                      className="w-full"
                    >
                      Select
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={handleUseTemplate}
            disabled={!selectedTemplate}
          >
            Use Selected Template
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
