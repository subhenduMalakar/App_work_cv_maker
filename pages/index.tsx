import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateCVButton } from "@/components/CVComponents";
import { useAuth } from '@/context/AuthContext';
import siteConfig from "@/config/siteConfig.json";
import { ArrowRight, FileText, Download, Upload, CheckCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  
  const handleCreateCV = () => {
    if (user) {
      router.push('/builder');
    } else {
      router.push('/auth');
    }
  };

  const features = [
    {
      icon: <FileText className="h-10 w-10 text-blue-600" />,
      title: "Professional Templates",
      description: "Choose from a variety of professional templates designed to highlight your skills and experience."
    },
    {
      icon: <Download className="h-10 w-10 text-blue-600" />,
      title: "Easy Export",
      description: "Export your CV in multiple formats including PDF, Word, and plain text."
    },
    {
      icon: <Upload className="h-10 w-10 text-blue-600" />,
      title: "Upload Existing CV",
      description: "Already have a CV? Upload it and our system will help you improve and update it."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
      title: "ATS-Friendly",
      description: "Our templates are designed to pass through Applicant Tracking Systems and get your CV noticed."
    }
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>{siteConfig.site.title}</title>
        <meta name="description" content={siteConfig.site.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Create a Professional CV in Minutes</h1>
              <p className="text-lg mb-8 text-blue-50">Build, manage and share your professional CV with our easy-to-use CV maker. Stand out from the crowd and land your dream job.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={handleCreateCV}
                >
                  Create Your CV
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-blue-600"
                  onClick={() => router.push('/templates')}
                >
                  Browse Templates
                </Button>
              </div>
            </div>            <div className="hidden md:block">
              <img 
                src="/cv-example.svg" 
                alt="CV Example" 
                className="rounded-lg shadow-xl max-w-md mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our CV Maker?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Professional CV?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of job seekers who have successfully landed interviews with our CV maker.</p>
          <CreateCVButton onCreate={handleCreateCV} />
        </div>
      </section>
    </div>
  );
}