import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Save, 
  Download, 
  ArrowLeft, 
  Trash2,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Code,
  FileText,
  User,
  BookOpen
} from 'lucide-react';
import { CV, Experience, Education, Skill, Language, Certificate, Project, Reference } from '@/data/cvData';

interface CVBuilderProps {
  cv: CV;
  onSave: (cv: CV) => void;
  onCancel: () => void;
  onExport: (cv: CV, format: string) => void;
}

export const CVBuilder: React.FC<CVBuilderProps> = ({ 
  cv: initialCV, 
  onSave, 
  onCancel,
  onExport 
}) => {
  const [cv, setCV] = useState<CV>(initialCV);
  const [activeTab, setActiveTab] = useState('personal');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCV({
      ...cv,
      personalInfo: {
        ...cv.personalInfo,
        [name]: value
      }
    });
  };

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      location: '',
      achievements: []
    };
    setCV({
      ...cv,
      experience: [...cv.experience, newExperience]
    });
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: any) => {
    const updatedExperience = [...cv.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setCV({
      ...cv,
      experience: updatedExperience
    });
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...cv.experience];
    updatedExperience.splice(index, 1);
    setCV({
      ...cv,
      experience: updatedExperience
    });
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      location: ''
    };
    setCV({
      ...cv,
      education: [...cv.education, newEducation]
    });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: any) => {
    const updatedEducation = [...cv.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setCV({
      ...cv,
      education: updatedEducation
    });
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...cv.education];
    updatedEducation.splice(index, 1);
    setCV({
      ...cv,
      education: updatedEducation
    });
  };

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: '',
      level: 3,
      category: ''
    };
    setCV({
      ...cv,
      skills: [...cv.skills, newSkill]
    });
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: any) => {
    const updatedSkills = [...cv.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setCV({
      ...cv,
      skills: updatedSkills
    });
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...cv.skills];
    updatedSkills.splice(index, 1);
    setCV({
      ...cv,
      skills: updatedSkills
    });
  };

  // Language handlers
  const handleAddLanguage = () => {
    const newLanguage: Language = {
      id: `lang-${Date.now()}`,
      name: '',
      proficiency: 'Limited Working'
    };
    setCV({
      ...cv,
      languages: [...cv.languages, newLanguage]
    });
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: any) => {
    const updatedLanguages = [...cv.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };
    setCV({
      ...cv,
      languages: updatedLanguages
    });
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...cv.languages];
    updatedLanguages.splice(index, 1);
    setCV({
      ...cv,
      languages: updatedLanguages
    });
  };

  // Certificate handlers
  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      description: ''
    };
    setCV({
      ...cv,
      certificates: [...cv.certificates, newCertificate]
    });
  };

  const handleCertificateChange = (index: number, field: keyof Certificate, value: any) => {
    const updatedCertificates = [...cv.certificates];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [field]: value
    };
    setCV({
      ...cv,
      certificates: updatedCertificates
    });
  };

  const handleRemoveCertificate = (index: number) => {
    const updatedCertificates = [...cv.certificates];
    updatedCertificates.splice(index, 1);
    setCV({
      ...cv,
      certificates: updatedCertificates
    });
  };

  // Project handlers
  const handleAddProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      technologies: []
    };
    setCV({
      ...cv,
      projects: [...cv.projects, newProject]
    });
  };

  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...cv.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setCV({
      ...cv,
      projects: updatedProjects
    });
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...cv.projects];
    updatedProjects.splice(index, 1);
    setCV({
      ...cv,
      projects: updatedProjects
    });
  };

  // Reference handlers
  const handleAddReference = () => {
    const newReference: Reference = {
      id: `ref-${Date.now()}`,
      name: '',
      company: '',
      position: '',
      email: '',
      phone: ''
    };
    setCV({
      ...cv,
      references: [...cv.references, newReference]
    });
  };

  const handleReferenceChange = (index: number, field: keyof Reference, value: any) => {
    const updatedReferences = [...cv.references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    setCV({
      ...cv,
      references: updatedReferences
    });
  };

  const handleRemoveReference = (index: number) => {
    const updatedReferences = [...cv.references];
    updatedReferences.splice(index, 1);
    setCV({
      ...cv,
      references: updatedReferences
    });
  };

  const handleSave = () => {
    onSave({
      ...cv,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold ml-4">{cv.name || 'Untitled CV'}</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onExport(cv, 'pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        <div className="bg-white p-4 rounded-lg shadow h-fit">
          <Tabs 
            defaultValue="personal" 
            className="w-full" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-1 lg:flex lg:flex-col">
              <TabsTrigger value="personal" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="experience" className="justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="justify-start">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger value="skills" className="justify-start">
                <Code className="h-4 w-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="languages" className="justify-start">
                <Languages className="h-4 w-4 mr-2" />
                Languages
              </TabsTrigger>
              <TabsTrigger value="certificates" className="justify-start">
                <Award className="h-4 w-4 mr-2" />
                Certificates
              </TabsTrigger>
              <TabsTrigger value="projects" className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="references" className="justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                References
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>        <div className="space-y-6 bg-white p-5 rounded-lg shadow overflow-y-auto max-h-[80vh]">
          {activeTab === 'personal' && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input 
                      name="firstName"
                      value={cv.personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input 
                      name="lastName"
                      value={cv.personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Professional Title</label>
                    <Input 
                      name="title"
                      value={cv.personalInfo.title}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      name="email"
                      type="email"
                      value={cv.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input 
                      name="phone"
                      value={cv.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input 
                      name="address"
                      placeholder="City, Country"
                      value={cv.personalInfo.address}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Website</label>
                    <Input 
                      name="website"
                      placeholder="yourwebsite.com"
                      value={cv.personalInfo.website}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">LinkedIn</label>
                    <Input 
                      name="linkedin"
                      placeholder="linkedin.com/in/yourprofile"
                      value={cv.personalInfo.linkedin}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Professional Summary</label>
                    <Textarea 
                      name="summary"
                      placeholder="A brief summary of your professional background and goals"
                      value={cv.personalInfo.summary}
                      onChange={handlePersonalInfoChange}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              {cv.experience.map((exp, index) => (
                <Card key={exp.id} className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveExperience(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input 
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <Input 
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input 
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input 
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                          disabled={exp.isCurrent}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea 
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" onClick={handleAddExperience}>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <Card key={edu.id} className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Institution</label>
                        <Input 
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Degree</label>
                        <Input 
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Field of Study</label>
                        <Input 
                          value={edu.field}
                          onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">GPA (optional)</label>
                        <Input 
                          value={edu.gpa || ''}
                          onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input 
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input 
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" onClick={handleAddEducation}>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {cv.skills.map((skill, index) => (
                      <div key={skill.id} className="flex items-center space-x-2">
                        <Input 
                          placeholder="Skill name"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                          className="flex-grow"
                        />
                        <select 
                          className="border rounded px-3 py-2"
                          value={skill.level}
                          onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                        >
                          <option value="1">Beginner</option>
                          <option value="2">Basic</option>
                          <option value="3">Intermediate</option>
                          <option value="4">Advanced</option>
                          <option value="5">Expert</option>
                        </select>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveSkill(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddSkill}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {cv.languages.map((language, index) => (
                      <div key={language.id} className="flex items-center space-x-2">
                        <Input 
                          placeholder="Language name"
                          value={language.name}
                          onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                          className="flex-grow"
                        />
                        <select 
                          className="border rounded px-3 py-2"
                          value={language.proficiency}
                          onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                        >
                          <option value="Basic">Basic</option>
                          <option value="Conversational">Conversational</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Native">Native</option>
                        </select>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveLanguage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddLanguage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Language
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {cv.certificates.map((certificate, index) => (
                      <div key={certificate.id} className="flex items-center space-x-2">
                        <Input 
                          placeholder="Certificate name"
                          value={certificate.name}
                          onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          placeholder="Issuer"
                          value={certificate.issuer}
                          onChange={(e) => handleCertificateChange(index, 'issuer', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          type="date"
                          value={certificate.date}
                          onChange={(e) => handleCertificateChange(index, 'date', e.target.value)}
                          className="flex-grow"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveCertificate(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddCertificate}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {cv.projects.map((project, index) => (
                      <div key={project.id} className="flex items-center space-x-2">
                        <Input 
                          placeholder="Project name"
                          value={project.name}
                          onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          placeholder="Description"
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          type="date"
                          value={project.startDate}
                          onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          type="date"
                          value={project.endDate}
                          onChange={(e) => handleProjectChange(index, 'endDate', e.target.value)}
                          className="flex-grow"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveProject(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddProject}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'references' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {cv.references.map((reference, index) => (
                      <div key={reference.id} className="flex items-center space-x-2">
                        <Input 
                          placeholder="Reference name"
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          placeholder="Company"
                          value={reference.company}
                          onChange={(e) => handleReferenceChange(index, 'company', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          placeholder="Position"
                          value={reference.position}
                          onChange={(e) => handleReferenceChange(index, 'position', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          placeholder="Email"
                          value={reference.email}
                          onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          placeholder="Phone"
                          value={reference.phone}
                          onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                          className="flex-grow"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveReference(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddReference}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Reference
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
