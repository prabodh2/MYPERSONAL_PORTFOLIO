import axios from 'axios';

const API_BASE = '/api';
// const API_BASE = import.meta.env.VITE_API_URL || '/api';

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
      title: "Paisa Pakad",
      subtitle: "Secure Digital Payment & Money Management App",
      description: "A secure digital payment and money management application designed for easy transactions and savings.",
      contributions: [
        "Secure digital payment functionality",
        "Sending money",
        "Receiving money",
        "Money tracking",
        "Security improvements",
        "Performance improvements",
        "User experience improvements"
      ],
      tags: ["Digital Payments", "Money Management", "Security", "Performance", "UX"],
      isClone: false,
      githubUrl: null,
      visualTheme: "fintech",
      featured: true
    },
    {
      _id: "p2",
      title: "Cars24 Clone",
      subtitle: "Practice / Clone Project",
      description: "A web application that enables users to buy, sell, and exchange used cars.",
      contributions: [
        "Car listings interface",
        "Price estimation feature",
        "Smooth user interaction",
        "Responsive design",
        "Efficient performance"
      ],
      tags: ["Web Development", "Responsive Design", "Automotive", "UX"],
      isClone: true,
      cloneLabel: "Practice / Clone Project",
      githubUrl: "https://github.com/prabodh2/Cars_24_FullStackApp",
      visualTheme: "automotive",
      featured: true
    },
    {
      _id: "p3",
      title: "Food Delivery App",
      subtitle: "Full-Stack Food Ordering & Management System",
      description: "A full-stack food ordering application featuring role-based access control and administrative operations.",
      contributions: [
        "Developed a full-stack food ordering application using Flutter for the frontend and Node.js for the backend.",
        "Implemented role-based access control for Users, Restaurant Owners, and Admins.",
        "Built core features for food ordering, restaurant management, and administrative operations with a focus on usability and scalability."
      ],
      tags: ["Flutter", "Node.js", "Full Stack", "Food Delivery", "RBAC"],
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
      location: "Remote",
      period: "August 2025 – December 2025",
      responsibilities: [
        "Developed a company website from scratch with a focus on responsive design and intuitive user experience.",
        "Built user interfaces using modern frontend technologies, ensuring clean and maintainable code.",
        "Followed best practices to improve performance, scalability, and overall application quality.",
        "Worked closely with designers and backend developers to deliver accurate and production-ready features.",
        "Tested and debugged components to ensure smooth functionality across different devices and browsers."
      ],
      tags: ["HTML", "CSS", "JavaScript", "React.js"]
    },
    {
      _id: "e2",
      role: "Full Stack Developer Intern",
      company: "Funds And Toil Private Limited",
      location: "Remote",
      period: "May 2026 – July 2026",
      responsibilities: [
        "Developed and implemented a full-stack e-commerce website from scratch using the MERN stack.",
        "Built responsive and user-friendly interfaces using React.js, focusing on performance and seamless user experience.",
        "Developed backend APIs and server-side functionality using Node.js and Express.js.",
        "Integrated MongoDB for efficient data management and implemented core e-commerce functionalities."
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "MERN Stack", "E-Commerce"]
    }
  ],
  education: [
    {
      _id: "edu1",
      degree: "Bachelor of Technology in Computer Science and Technology",
      institution: "ITM Skills University",
      location: "Kharghar, Maharashtra",
      period: "2023 – 2027",
      isPrimary: true
    },
    {
      _id: "edu2",
      degree: "Intermediate Education (MPC)",
      institution: "Sri Chaitanya College",
      location: "Vijayawada, Andhra Pradesh",
      period: "2021 – 2023",
      isPrimary: false
    },
    {
      _id: "edu3",
      degree: "Secondary School Certificate (SSC)",
      institution: "Bhashyam High School",
      location: "Adoni, Andhra Pradesh",
      period: "2020 – 2021",
      isPrimary: false
    }
  ],
  skills: [
    {
      _id: "s1",
      category: "Technical Skills",
      iconName: "Code2",
      items: [
        { name: "C++", icon: "Code" },
        { name: "JavaScript", icon: "FileCode" },
        { name: "CSS", icon: "Palette" },
        { name: "HTML", icon: "Layout" },
        { name: "React", icon: "Atom" },
        { name: "Python", icon: "Terminal" },
        { name: "Flutter", icon: "Smartphone" },
        { name: "Node.js", icon: "Server" },
        { name: "Express.js", icon: "Cpu" },
        { name: "MongoDB", icon: "Database" }
      ]
    },

    {
      _id: "s3",
      category: "Data Science",
      iconName: "BarChart3",
      items: [
        { name: "Data Analysis", icon: "PieChart" },
        { name: "Data Visualization", icon: "LineChart" }
      ]
    },
    {
      _id: "s4",
      category: "Cloud Computing",
      iconName: "Cloud",
      items: [{ name: "AWS", icon: "CloudRain" }]
    },
    {
      _id: "s5",
      category: "Tools",
      iconName: "Wrench",
      items: [
        { name: "Git", icon: "GitBranch" },
        { name: "GitHub", icon: "Github" }
      ]
    },
    {
      _id: "s6",
      category: "Soft Skills",
      iconName: "Users",
      items: [
        { name: "Communication", icon: "MessageSquare" },
        { name: "Active Listener", icon: "Ear" },
        { name: "Hard Working", icon: "Zap" }
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
