import React from 'react';
import { 
  Download, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  MapPin,
  Calendar,
  Link
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CV } from '@/data/cvData';
import { formatDate } from '@/lib/utils';

interface CVPreviewProps {
  cv: CV;
  onBack: () => void;
  onExport: (format: string) => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cv, onBack, onExport }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold ml-4">{cv.name}</h1>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onExport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className={`
          p-8 
          ${cv.template === 'Professional' ? 'bg-white' : ''}
          ${cv.template === 'Creative' ? 'bg-gradient-to-r from-teal-50 to-blue-50' : ''}
          ${cv.template === 'Modern' ? 'bg-gray-50' : ''}
          ${cv.template === 'Academic' ? 'bg-indigo-50' : ''}
          ${cv.template === 'Minimal' ? 'bg-white' : ''}
        `}>
          <div className="space-y-8">
            {/* Header */}
            <div className={`
              ${cv.template === 'Professional' ? 'border-b pb-6' : ''}
              ${cv.template === 'Creative' ? 'text-center' : ''}
              ${cv.template === 'Modern' ? 'flex flex-col md:flex-row justify-between items-start md:items-center gap-4' : ''}
              ${cv.template === 'Academic' ? 'border-b pb-6' : ''}
              ${cv.template === 'Minimal' ? 'text-center' : ''}
            `}>
              <div>
                <h1 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-3xl text-gray-900' : ''}
                  ${cv.template === 'Creative' ? 'text-4xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-3xl text-slate-800' : ''}
                  ${cv.template === 'Academic' ? 'text-3xl text-gray-900' : ''}
                  ${cv.template === 'Minimal' ? 'text-3xl text-gray-800' : ''}
                `}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</h1>
                <p className={`
                  mt-1
                  ${cv.template === 'Professional' ? 'text-xl text-gray-600' : ''}
                  ${cv.template === 'Creative' ? 'text-lg font-medium text-blue-500' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-600' : ''}
                  ${cv.template === 'Academic' ? 'text-xl text-gray-600' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-600' : ''}
                `}>{cv.personalInfo.title}</p>
              </div>

              <div className={`
                flex flex-wrap gap-3 
                ${cv.template === 'Creative' ? 'justify-center mt-4' : ''}
                ${cv.template === 'Modern' ? 'justify-end' : ''}
                ${cv.template === 'Minimal' ? 'justify-center mt-4' : ''}
              `}>
                {cv.personalInfo.phone && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{cv.personalInfo.phone}</span>
                  </div>
                )}
                {cv.personalInfo.email && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{cv.personalInfo.email}</span>
                  </div>
                )}
                {cv.personalInfo.website && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Globe className="h-4 w-4" />
                    <span>{cv.personalInfo.website}</span>
                  </div>
                )}
                {cv.personalInfo.linkedin && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Linkedin className="h-4 w-4" />
                    <span>{cv.personalInfo.linkedin}</span>
                  </div>
                )}
                {cv.personalInfo.address && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{cv.personalInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            {cv.personalInfo.summary && (
              <div className="space-y-2">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>Summary</h2>
                <p className="text-gray-700 text-justify">{cv.personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {cv.experience.length > 0 && (
              <div className="space-y-4">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>Professional Experience</h2>
                
                <div className="space-y-6">
                  {cv.experience.map((exp) => (
                    <div key={exp.id} className={`
                      ${cv.template === 'Modern' ? 'flex flex-col md:flex-row gap-4' : ''}
                    `}>
                      <div className={`
                        ${cv.template === 'Modern' ? 'md:w-1/3' : ''}
                      `}>
                        <p className="font-bold text-gray-800">{exp.company}</p>
                        <p className="text-gray-600">{exp.location}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`
                        ${cv.template === 'Modern' ? 'md:w-2/3' : ''}
                      `}>
                        <p className="font-semibold text-gray-700">{exp.position}</p>
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                        
                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="list-disc list-inside mt-2 text-gray-700">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cv.education.length > 0 && (
              <div className="space-y-4">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>Education</h2>
                
                <div className="space-y-6">
                  {cv.education.map((edu) => (
                    <div key={edu.id} className={`
                      ${cv.template === 'Modern' ? 'flex flex-col md:flex-row gap-4' : ''}
                    `}>
                      <div className={`
                        ${cv.template === 'Modern' ? 'md:w-1/3' : ''}
                      `}>
                        <p className="font-bold text-gray-800">{edu.institution}</p>
                        <p className="text-gray-600">{edu.location}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`
                        ${cv.template === 'Modern' ? 'md:w-2/3' : ''}
                      `}>
                        <p className="font-semibold text-gray-700">{edu.degree} in {edu.field}</p>
                        {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                        {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {cv.skills.length > 0 && (
              <div className="space-y-4">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>Skills</h2>
                
                <div className={`
                  ${cv.template === 'Professional' ? 'flex flex-wrap gap-2' : ''}
                  ${cv.template === 'Creative' ? 'grid grid-cols-2 gap-4' : ''}
                  ${cv.template === 'Modern' ? 'grid grid-cols-2 gap-x-8 gap-y-2' : ''}
                  ${cv.template === 'Academic' ? 'flex flex-wrap gap-2' : ''}
                  ${cv.template === 'Minimal' ? 'flex flex-wrap gap-2' : ''}
                `}>
                  {cv.skills.map((skill) => (
                    <div key={skill.id} className={`
                      ${cv.template === 'Professional' ? 'bg-gray-100 px-3 py-1 rounded-full text-gray-700' : ''}
                      ${cv.template === 'Creative' ? 'flex items-center' : ''}
                      ${cv.template === 'Modern' ? 'flex justify-between items-center' : ''}
                      ${cv.template === 'Academic' ? 'bg-gray-100 px-3 py-1 rounded-full text-gray-700' : ''}
                      ${cv.template === 'Minimal' ? 'bg-gray-100 px-3 py-1 rounded-full text-gray-700' : ''}
                    `}>
                      {cv.template === 'Creative' && (
                        <>
                          <span className="font-medium text-gray-700">{skill.name}</span>
                          <div className="h-1.5 bg-gray-200 rounded-full w-full max-w-32 ml-2">
                            <div 
                              className="h-1.5 bg-teal-500 rounded-full" 
                              style={{ width: `${skill.level * 20}%` }}
                            ></div>
                          </div>
                        </>
                      )}
                      
                      {cv.template === 'Modern' && (
                        <>
                          <span className="font-medium text-gray-700">{skill.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i} 
                                className={`h-2 w-2 rounded-full mx-0.5 ${i < skill.level ? 'bg-blue-500' : 'bg-gray-200'}`}
                              ></div>
                            ))}
                          </div>
                        </>
                      )}
                      
                      {(cv.template === 'Professional' || cv.template === 'Academic' || cv.template === 'Minimal') && (
                        <span>{skill.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cv.languages.length > 0 && (
              <div className="space-y-4">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>Languages</h2>
                
                <div className="flex flex-wrap gap-4">
                  {cv.languages.map((language) => (
                    <div key={language.id} className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">{language.name}:</span>
                      <span className="text-gray-600">{language.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {cv.projects.length > 0 && (
              <div className="space-y-4">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>Projects</h2>
                
                <div className="space-y-4">
                  {cv.projects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{project.name}</h3>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                            <Link className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {(project.startDate || project.endDate) && (
                          <span className="text-sm text-gray-500">
                            ({project.startDate && formatDate(project.startDate)}
                            {project.endDate && ` - ${formatDate(project.endDate)}`})
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates */}
            {cv.certificates.length > 0 && (
              <div className="space-y-4">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>Certifications</h2>
                
                <div className="space-y-3">
                  {cv.certificates.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">{cert.name}</p>
                        <p className="text-gray-600">{cert.issuer}</p>
                        {cert.description && <p className="text-gray-700 text-sm mt-1">{cert.description}</p>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(cert.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {cv.references.length > 0 && (
              <div className="space-y-4">
                <h2 className={`
                  font-bold 
                  ${cv.template === 'Professional' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Creative' ? 'text-xl text-teal-600' : ''}
                  ${cv.template === 'Modern' ? 'text-lg text-slate-800 uppercase border-b border-slate-200 pb-1' : ''}
                  ${cv.template === 'Academic' ? 'text-lg text-gray-900 uppercase' : ''}
                  ${cv.template === 'Minimal' ? 'text-lg text-gray-800' : ''}
                `}>References</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cv.references.map((ref) => (
                    <div key={ref.id} className="space-y-1">
                      <p className="font-medium text-gray-800">{ref.name}</p>
                      <p className="text-gray-600">{ref.position} at {ref.company}</p>
                      {ref.email && <p className="text-gray-600">{ref.email}</p>}
                      {ref.phone && <p className="text-gray-600">{ref.phone}</p>}
                      {ref.relation && <p className="text-gray-500 text-sm">{ref.relation}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
