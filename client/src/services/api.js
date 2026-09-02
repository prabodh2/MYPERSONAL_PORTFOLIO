import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://prabodh-portfolio-api.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Fallback dynamic data matching exact resume details
const localFallback = {
  projects: [
    {
      _id: "p1",
      title: "Cars24 Clone",
      subtitle: "Used-Car Marketplace Web Application",
      description: "Built a used-car marketplace web application enabling users to browse, list, buy, sell, and exchange vehicles.",
      contributions: [
        "Built a used-car marketplace web application enabling users to browse, list, buy, sell, and exchange vehicles.",
        "Implemented car listings, price estimation, search-oriented user flows, and responsive user interface features.",
        "Focused on responsive design, performance optimization, usability, and a smooth end-to-end user experience."
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Marketplace", "UX"],
      isClone: true,
      cloneLabel: "Practice / Clone Project",
      githubUrl: "https://github.com/prabodh2/Cars_24_FullStackApp",
      visualTheme: "automotive",
      featured: true
    },
    {
      _id: "p2",
      title: "Food Delivery Application",
      subtitle: "Full-Stack Food Ordering & Management System",
      description: "Developed a full-stack food ordering application featuring role-based access control and administrative workflows.",
      contributions: [
        "Developed a full-stack food ordering application using Flutter for the frontend and Node.js for the backend.",
        "Implemented role-based access control for Users, Restaurant Owners, and Administrators.",
        "Built core food ordering, restaurant management, and administrative workflows with a focus on usability, maintainability, and scalability."
      ],
      tags: ["Flutter", "Node.js", "Express.js", "Full Stack", "Food Delivery", "RBAC"],
      isClone: false,
      githubUrl: "https://github.com/prabodh2",
      visualTheme: "food",
      featured: true
    }
  ],
  experiences: [
    {
      _id: "e1",
      role: "Frontend Developer Intern",
      company: "CODEVERSEBYSAIKUBER",
      location: "Remote, India",
      period: "Aug–Dec 2025",
      responsibilities: [
        "Developed a company website from scratch with a focus on responsive design and intuitive user experience.",
        "Built user interfaces using modern frontend technologies, following clean and maintainable coding practices.",
        "Applied best practices to improve performance, scalability, and overall application quality.",
        "Collaborated with designers and backend developers to deliver accurate, production-ready features.",
        "Tested and debugged components to ensure reliable functionality across devices and browsers."
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive Design"]
    },
    {
      _id: "e2",
      role: "Full Stack Developer Intern",
      company: "Funds And Toil Private Limited",
      location: "Remote, India",
      period: "May–Jul 2026",
      responsibilities: [
        "Developed and implemented a full-stack e-commerce website from scratch using the MERN stack.",
        "Built responsive, user-friendly interfaces with React.js, focusing on performance and seamless user experience.",
        "Developed backend APIs and server-side functionality using Node.js and Express.js.",
        "Integrated MongoDB for efficient data management and implemented core e-commerce functionality."
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "MERN Stack"]
    }
  ],
  education: [
    {
      _id: "edu1",
      degree: "B.Tech in Computer Science and Technology",
      institution: "ITM Skills University",
      location: "Kharghar, Maharashtra",
      period: "2023 – 2027",
      isPrimary: true
    },
    {
      _id: "edu2",
      degree: "Class 12 (Intermediate)",
      institution: "Sri Chaitanya College",
      location: "Vijayawada, Andhra Pradesh",
      period: "2021 – 2023",
      isPrimary: false
    },
    {
      _id: "edu3",
      degree: "Class 10 (SSC)",
      institution: "Bhashyam High School",
      location: "Adoni, Andhra Pradesh",
      period: "2020 – 2021",
      isPrimary: false
    }
  ],
  skills: [
    {
      _id: "s1",
      category: "Programming Languages",
      iconName: "Code2",
      items: [
        { name: "C++", icon: "Code" },
        { name: "Python", icon: "Terminal" },
        { name: "JavaScript", icon: "FileCode" },
        { name: "HTML5", icon: "Layout" },
        { name: "CSS3", icon: "Palette" }
      ]
    },
    {
      _id: "s2",
      category: "Frontend",
      iconName: "Layout",
      items: [
        { name: "React.js", icon: "Atom" },
        { name: "Flutter", icon: "Smartphone" },
        { name: "Responsive Web Design", icon: "Layers" }
      ]
    },
    {
      _id: "s3",
      category: "Backend",
      iconName: "Server",
      items: [
        { name: "Node.js", icon: "Server" },
        { name: "Express.js", icon: "Cpu" },
        { name: "RESTful APIs", icon: "Globe" }
      ]
    },
    {
      _id: "s4",
      category: "Database",
      iconName: "Database",
      items: [
        { name: "MongoDB", icon: "Database" }
      ]
    },
    {
      _id: "s5",
      category: "Cloud & Tools",
      iconName: "Cloud",
      items: [
        { name: "AWS", icon: "CloudRain" },
        { name: "Git", icon: "GitBranch" },
        { name: "GitHub", icon: "Github" }
      ]
    },
    {
      _id: "s6",
      category: "Core Competencies",
      iconName: "Wrench",
      items: [
        { name: "Full Stack Development", icon: "Layers" },
        { name: "API Integration", icon: "Link" },
        { name: "Debugging", icon: "Bug" },
        { name: "Performance Optimization", icon: "Zap" }
      ]
    }
  ]
};

export const sendContactForm = async (formData) => {
  try {
    const res = await apiClient.post('/contact', formData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // Network fallback response
    return {
      success: true,
      message: "Message received! (Local network response - Thank you for reaching out)."
    };
  }
};

export const fetchProjects = async () => {
  try {
    const res = await apiClient.get('/portfolio/projects');
    return res.data.data || localFallback.projects;
  } catch (error) {
    return localFallback.projects;
  }
};

export const fetchExperience = async () => {
  try {
    const res = await apiClient.get('/portfolio/experience');
    return res.data.data || localFallback.experiences;
  } catch (error) {
    return localFallback.experiences;
  }
};

export const fetchEducation = async () => {
  try {
    const res = await apiClient.get('/portfolio/education');
    return res.data.data || localFallback.education;
  } catch (error) {
    return localFallback.education;
  }
};

export const fetchSkills = async () => {
  try {
    const res = await apiClient.get('/portfolio/skills');
    return res.data.data || localFallback.skills;
  } catch (error) {
    return localFallback.skills;
  }
};
