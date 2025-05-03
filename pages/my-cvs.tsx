import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { CVList } from '@/components/CVComponents';
import { CV, sampleCV } from '@/data/cvData';
import { PlusCircle } from 'lucide-react';

export default function MyCVs() {
  const router = useRouter();
  const { user } = useAuth();
  const [cvList, setCVList] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/auth');
      return;
    }

    // In a real implementation, we would fetch CVs from a database
    // For now, using sample data
    setCVList([sampleCV]);
    setLoading(false);
  }, [user, router]);

  const handleCreateCV = () => {
    router.push('/builder?mode=create');
  };

  const handleEditCV = (cv: CV) => {
    router.push(`/builder?mode=edit&id=${cv.id}`);
  };

  const handleDeleteCV = (id: string) => {
    // In a real implementation, this would delete from the database
    setCVList(cvList.filter(cv => cv.id !== id));
  };

  const handleViewCV = (cv: CV) => {
    router.push(`/builder?mode=preview&id=${cv.id}`);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>My CVs | CV Maker Pro</title>
      </Head>

      <div className="container mx-auto max-w-6xl">
        <CVList 
          cvList={cvList}
          onCreateCV={handleCreateCV}
          onEditCV={handleEditCV}
          onDeleteCV={handleDeleteCV}
          onViewCV={handleViewCV}
        />

        {cvList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">You haven't created any CVs yet. Get started by creating your first CV!</p>
            <Button onClick={handleCreateCV}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Your First CV
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
