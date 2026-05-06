"""
Resume Parser - Extracts information from PDF resume
Uses PyPDF2 and text processing to extract structured data
"""

import PyPDF2
import re
from typing import Dict, List, Optional
from pathlib import Path

class ResumeParser:
    """Parse resume PDF and extract structured information"""
    
    def __init__(self, resume_path: str):
        self.resume_path = Path(resume_path)
        self.text = self._extract_text()
    
    def _extract_text(self) -> str:
        """Extract text from PDF"""
        try:
            if not self.resume_path.exists():
                print(f"Warning: Resume file not found at {self.resume_path}")
                return ""
            
            text = ""
            with open(self.resume_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
            
            return text
        except Exception as e:
            print(f"Error extracting text from PDF: {str(e)}")
            return ""
    
    def parse(self) -> Dict:
        """Parse all sections from resume"""
        return {
            'education': self.extract_education(),
            'experience': self.extract_experience(),
            'skills': self.extract_skills(),
            'projects': self.extract_projects(),
            'achievements': self.extract_achievements(),
            'contact': self.extract_contact()
        }
    
    def extract_education(self) -> List[Dict]:
        """Extract education information"""
        education = []
        
        # Pattern for education (adjust based on your resume format)
        education_pattern = r'(B\.Tech|Bachelor|Master|M\.Tech|Diploma).*?(?:in|from)?\s*([A-Za-z\s&]+?)(?:\(|,|\d{4}|$)'
        
        matches = re.finditer(education_pattern, self.text, re.IGNORECASE)
        for match in matches:
            degree = match.group(1)
            field = match.group(2).strip()
            
            # Extract year
            year_match = re.search(r'\b(20\d{2})\b', self.text[match.start():match.end()+50])
            year = year_match.group(1) if year_match else 'N/A'
            
            education.append({
                'degree': f'{degree} in {field}',
                'institution': 'Bharat Institute of Engineering & Technology (BIET)',
                'year': year
            })
        
        if not education:
            education = [{
                'degree': 'B.Tech in Computer Science & Engineering',
                'institution': 'Bharat Institute of Engineering & Technology (BIET)',
                'year': '2024'
            }]
        
        return education
    
    def extract_experience(self) -> List[Dict]:
        """Extract work experience"""
        experience = []
        
        # Pattern for job titles and companies
        job_pattern = r'([A-Za-z\s]*(?:Engineer|Developer|Intern|Manager|Specialist)[A-Za-z\s]*)\s+at\s+([A-Za-z\s&\.]+?)(?:\(|\||$)'
        
        matches = re.finditer(job_pattern, self.text, re.IGNORECASE)
        for match in matches:
            role = match.group(1).strip()
            company = match.group(2).strip()
            
            experience.append({
                'role': role,
                'company': company,
                'duration': '6 months'
            })
        
        if not experience:
            experience = [{
                'role': 'Software Engineering Intern',
                'company': 'Technology Company',
                'duration': '6 months'
            }]
        
        return experience
    
    def extract_skills(self) -> Dict[str, List[str]]:
        """Extract technical skills"""
        
        # Predefined skill lists
        backend_keywords = ['java', 'python', 'spring', 'django', 'flask', 'nodejs', 'sql', 'postgresql', 'mongodb', 'microservices', 'rest', 'api']
        frontend_keywords = ['react', 'javascript', 'html', 'css', 'angular', 'vue', 'typescript', 'webpack', 'gsap']
        data_keywords = ['machine learning', 'tensorflow', 'pandas', 'numpy', 'scikit-learn', 'data science', 'analytics', 'data analysis']
        
        text_lower = self.text.lower()
        
        backend = [skill.upper() for skill in backend_keywords if skill in text_lower]
        frontend = [skill.upper() for skill in frontend_keywords if skill in text_lower]
        data = [skill for skill in data_keywords if skill in text_lower]
        
        # Fallback to default skills if extraction fails
        if not backend:
            backend = ['Java', 'Python', 'Spring Boot', 'RESTful APIs', 'Microservices', 'SQL', 'PostgreSQL']
        
        if not frontend:
            frontend = ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design']
        
        if not data:
            data = ['Machine Learning', 'Data Analytics', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn']
        
        return {
            'backend': backend,
            'frontend': frontend,
            'data': data
        }
    
    def extract_projects(self) -> List[Dict]:
        """Extract project information"""
        projects = []
        
        # Pattern for projects (adjust based on your resume format)
        project_pattern = r'(?:Project|Portfolio):\s*([^\n]+)\n\s*([^\n]+(?:\n[^\n]+)*?)(?:\n\n|$)'
        
        matches = re.finditer(project_pattern, self.text, re.IGNORECASE)
        for match in matches:
            title = match.group(1).strip()
            description = match.group(2).strip()
            
            projects.append({
                'title': title,
                'description': description,
                'link': '#',
                'github': 'https://github.com/AkashManda854'
            })
        
        if not projects:
            projects = [
                {
                    'title': 'E-Commerce Backend System',
                    'description': 'Scalable microservices-based backend for e-commerce platform using Spring Boot and PostgreSQL.',
                    'link': '#',
                    'github': 'https://github.com/AkashManda854'
                },
                {
                    'title': 'Machine Learning Prediction Model',
                    'description': 'Advanced ML model for data prediction and analysis using TensorFlow and Python.',
                    'link': '#',
                    'github': 'https://github.com/AkashManda854'
                },
                {
                    'title': 'Interactive Portfolio',
                    'description': 'Modern parallax portfolio with GSAP animations and full-stack architecture.',
                    'link': '#',
                    'github': 'https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH'
                }
            ]
        
        return projects
    
    def extract_achievements(self) -> List[str]:
        """Extract achievements and certifications"""
        achievements = []
        
        # Pattern for achievements/certifications
        achievement_pattern = r'(?:Achievement|Certification|Award|Certificate):\s*([^\n]+)'
        
        matches = re.finditer(achievement_pattern, self.text, re.IGNORECASE)
        for match in matches:
            achievement = match.group(1).strip()
            achievements.append(f"🏆 {achievement}")
        
        if not achievements:
            achievements = [
                '🏆 Strong foundation in backend systems and data analytics',
                '📊 Experience with machine learning and data science',
                '🚀 Full-stack development capabilities',
                '💡 Problem-solving and system design expertise'
            ]
        
        return achievements
    
    def extract_contact(self) -> Dict[str, str]:
        """Extract contact information"""
        contact = {
            'email': '',
            'phone': '',
            'location': ''
        }
        
        # Email pattern
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        email_match = re.search(email_pattern, self.text)
        if email_match:
            contact['email'] = email_match.group()
        
        # Phone pattern
        phone_pattern = r'(?:\+91|0)?[-.\s]?[6-9]\d{9}'
        phone_match = re.search(phone_pattern, self.text)
        if phone_match:
            contact['phone'] = phone_match.group()
        
        # Location pattern
        if 'hyderabad' in self.text.lower():
            contact['location'] = 'Hyderabad, India'
        elif 'bangalore' in self.text.lower():
            contact['location'] = 'Bangalore, India'
        elif 'delhi' in self.text.lower():
            contact['location'] = 'Delhi, India'
        else:
            contact['location'] = 'Hyderabad, Telangana, India'
        
        # Fallback values
        if not contact['email']:
            contact['email'] = 'mandaakash33@gmail.com'
        if not contact['phone']:
            contact['phone'] = '+91-9381957648'
        
        return contact

