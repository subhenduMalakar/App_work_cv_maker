// CV data types and interfaces

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
  achievements?: string[];
  isCurrent?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 or 0-100
  category?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native/Bilingual';
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  technologies?: string[];
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  position: string;
  email?: string;
  phone?: string;
  relation?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  summary?: string;
  photo?: string;
}

export interface CV {
  id: string;
  userId: string;
  name: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
  projects: Project[];
  references: Reference[];
  customSections?: {
    [key: string]: any;
  };
}

// Empty CV template
export const emptyCV: CV = {
  id: '',
  userId: '',
  name: 'Untitled CV',
  template: 'Professional',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personalInfo: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  languages: [],
  certificates: [],
  projects: [],
  references: [],
};

// Sample CV data for demonstration
export const sampleCV: CV = {
  id: 'sample-cv-1',
  userId: 'sample-user',
  name: 'Professional CV',
  template: 'Professional',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St',
    city: 'San Francisco',
    country: 'USA',
    postalCode: '94105',
    website: 'johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    summary: 'Experienced software engineer with a passion for building scalable applications and solving complex problems.',
  },
  education: [
    {
      id: 'ed-1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2020-09-01',
      endDate: '2022-06-01',
      description: 'Specialized in Artificial Intelligence and Machine Learning',
      location: 'Stanford, CA',
      gpa: '3.9/4.0',
    },
    {
      id: 'ed-2',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09-01',
      endDate: '2020-05-01',
      description: 'Dean\'s List, Computer Science Student Association',
      location: 'Berkeley, CA',
      gpa: '3.8/4.0',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      startDate: '2022-07-01',
      endDate: '',
      description: 'Lead the development of microservices architecture for the company\'s flagship product.',
      location: 'San Francisco, CA',
      achievements: [
        'Reduced API response time by 40% through code optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Mentored 5 junior developers'
      ],
      isCurrent: true,
    },
    {
      id: 'exp-2',
      company: 'Global Systems Inc.',
      position: 'Software Engineer',
      startDate: '2020-06-01',
      endDate: '2022-06-30',
      description: 'Developed and maintained RESTful APIs and web applications using Node.js and React.',
      location: 'San Jose, CA',
      achievements: [
        'Developed a real-time analytics dashboard that increased efficiency by 25%',
        'Refactored legacy codebase reducing technical debt by 30%'
      ],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'JavaScript', level: 5, category: 'Programming Languages' },
    { id: 'skill-2', name: 'TypeScript', level: 4, category: 'Programming Languages' },
    { id: 'skill-3', name: 'React', level: 5, category: 'Frontend' },
    { id: 'skill-4', name: 'Node.js', level: 4, category: 'Backend' },
    { id: 'skill-5', name: 'AWS', level: 3, category: 'Cloud' },
    { id: 'skill-6', name: 'Docker', level: 4, category: 'DevOps' },
    { id: 'skill-7', name: 'Kubernetes', level: 3, category: 'DevOps' },
    { id: 'skill-8', name: 'GraphQL', level: 4, category: 'API' },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native/Bilingual' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Professional Working' },
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-01-15',
      url: 'https://aws.amazon.com/certification/',
      description: 'Professional level certification for AWS architecture best practices',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-commerce Platform',
      description: 'Built a scalable e-commerce platform with React, Node.js, and MongoDB',
      startDate: '2022-01-01',
      endDate: '2022-06-30',
      url: 'https://github.com/johndoe/ecommerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    },
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Jane Smith',
      company: 'Tech Innovations Inc.',
      position: 'CTO',
      email: 'jane.smith@example.com',
      phone: '(123) 456-7899',
      relation: 'Direct Manager',
    },
  ],
};

// CV templates data
export const cvTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean and professional template suitable for traditional industries',
    preview: '/cv-templates/professional.svg',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold and creative template for design and creative industries',
    preview: '/cv-templates/creative.svg',
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Designed for academic and research positions',
    preview: '/cv-templates/academic.svg',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary design for forward-thinking professionals',
    preview: '/cv-templates/modern.svg',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A minimalist design focusing on content with clean typography',
    preview: '/cv-templates/minimal.svg',
  },
];
