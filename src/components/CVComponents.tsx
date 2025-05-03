import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CV, emptyCV } from '@/data/cvData';

interface CVCardProps {
  cv: CV;
  onEdit: (cv: CV) => void;
  onDelete: (id: string) => void;
  onView: (cv: CV) => void;
}

export const CVCard: React.FC<CVCardProps> = ({ cv, onEdit, onDelete, onView }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{cv.name}</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{cv.template}</span>
        </CardTitle>
        <p className="text-sm text-gray-500">Last updated: {new Date(cv.updatedAt).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-4">
          <p className="font-medium">{cv.personalInfo.firstName} {cv.personalInfo.lastName}</p>
          <p className="text-gray-600">{cv.personalInfo.title}</p>
        </div>
        <div className="text-xs text-gray-500 mb-4">
          <p>{cv.experience.length} experiences · {cv.education.length} educations · {cv.skills.length} skills</p>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => onView(cv)}>
            <Paperclip className="h-4 w-4 mr-1" /> View
          </Button>
          <div className="space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(cv)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(cv.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CVListProps {
  cvList: CV[];
  onCreateCV: () => void;
  onEditCV: (cv: CV) => void;
  onDeleteCV: (id: string) => void;
  onViewCV: (cv: CV) => void;
}

export const CVList: React.FC<CVListProps> = ({ 
  cvList, 
  onCreateCV, 
  onEditCV, 
  onDeleteCV,
  onViewCV 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My CVs</h2>
        <Button onClick={onCreateCV}>
          <PlusCircle className="h-4 w-4 mr-2" /> New CV
        </Button>
      </div>
      
      {cvList.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You haven't created any CVs yet</p>
          <Button onClick={onCreateCV}>Create Your First CV</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cvList.map(cv => (
            <CVCard 
              key={cv.id} 
              cv={cv} 
              onEdit={onEditCV} 
              onDelete={onDeleteCV}
              onView={onViewCV}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface CreateCVButtonProps {
  onCreate: () => void;
}

export const CreateCVButton: React.FC<CreateCVButtonProps> = ({ onCreate }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <PlusCircle className="h-4 w-4 mr-2" /> Create a New CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New CV</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">Start with:</p>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => onCreate()}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Blank CV
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onCreate()}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Upload Existing CV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
