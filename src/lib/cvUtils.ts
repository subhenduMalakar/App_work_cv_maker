import { v4 as uuidv4 } from 'uuid';
import { CV, emptyCV } from '@/data/cvData';

// Format date function for display
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short'
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

// Create a new empty CV
export function createNewCV(userId: string, template = 'Professional'): CV {
  return {
    ...emptyCV,
    id: uuidv4(),
    userId,
    template,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Create a slug from text
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Generate PDF file name
export function generateCVFileName(cv: CV, format = 'pdf'): string {
  const name = cv.personalInfo.firstName && cv.personalInfo.lastName
    ? `${cv.personalInfo.firstName}-${cv.personalInfo.lastName}-CV`
    : 'CV';
  
  const slug = createSlug(name);
  return `${slug}.${format.toLowerCase()}`;
}

// Extract text content from a PDF file
export async function extractTextFromPDF(file: File): Promise<string> {
  // This is a placeholder - in a real implementation, you would use 
  // a library like pdf.js to extract text content
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Text content extracted from PDF');
    }, 500);
  });
}

// Parse CV data from extracted text using AI
export async function parseExtractedText(text: string, userId: string): Promise<Partial<CV>> {
  // This is a placeholder - in a real implementation, you would send
  // the extracted text to an AI service to parse CV data
  return {
    id: uuidv4(),
    userId,
    name: 'Imported CV',
    template: 'Professional',
    personalInfo: {
      firstName: 'Imported',
      lastName: 'CV',
      title: 'Extracted Position',
      email: 'example@example.com',
      phone: '',
      summary: text.substring(0, 200) + '...',
    },
  };
}

// Download CV as PDF
export function downloadCV(cv: CV, format = 'pdf'): void {
  // This is a placeholder - in a real implementation, you would generate
  // a PDF document and trigger a download
  
  // For demonstration purposes, we'll just create a text representation
  const content = `
    ${cv.personalInfo.firstName} ${cv.personalInfo.lastName}
    ${cv.personalInfo.title}
    
    Contact: ${cv.personalInfo.email} | ${cv.personalInfo.phone}
    
    Summary:
    ${cv.personalInfo.summary}
    
    Experience:
    ${cv.experience.map(exp => `
      ${exp.position} at ${exp.company}
      ${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
      ${exp.description}
    `).join('\n')}
    
    Education:
    ${cv.education.map(edu => `
      ${edu.degree} in ${edu.field}
      ${edu.institution}
      ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
    `).join('\n')}
    
    Skills:
    ${cv.skills.map(skill => skill.name).join(', ')}
  `;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = generateCVFileName(cv, format === 'pdf' ? 'txt' : format);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Share CV via email
export function shareCV(cv: CV, email: string): void {
  // This is a placeholder - in a real implementation, you would 
  // implement sharing functionality with the provided email
  
  const subject = `Check out my CV - ${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`;
  const body = `
    I wanted to share my CV with you.
    
    Name: ${cv.personalInfo.firstName} ${cv.personalInfo.lastName}
    Title: ${cv.personalInfo.title}
    
    [CV content would be attached or linked here]
  `;
  
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
