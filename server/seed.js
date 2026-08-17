import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';
import Education from './models/Education.js';

dotenv.config();

const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prabodh_portfolio';

const seedData = async () => {
  try {
    await mongoose.connect(connStr);
    console.log('[Seed] Connected to MongoDB...');

    // Clear existing
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});

    // Seed Projects
    await Project.insertMany([
      {
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
        title: "Cars24 Clone",
        subtitle: "Practice / Clone Project",
        description: "A web application that enables users to buy, sell, and exchange used cars.",
        contributions: [
          "Car listings interface",
          "Price estimation feature",
          "Smooth user interaction",
          "Responsive cross-device design",
          "Efficient rendering performance"
        ],
        tags: ["Web Development", "Responsive Design", "Automotive", "UX"],
        isClone: true,
        cloneLabel: "Practice / Clone Project",
        githubUrl: "https://github.com/prabodh2/Cars_24_FullStackApp",
        visualTheme: "automotive",
        featured: true
      },
      {
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
    ]);

    // Seed Experiences
    await Experience.insertMany([
      {
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
    ]);

    // Seed Education
    await Education.insertMany([
      {
        degree: "Bachelor of Technology in Computer Science and Technology",
        institution: "ITM Skills University",
        location: "Kharghar, Maharashtra",
        period: "2023 – 2027",
        isPrimary: true
      },
      {
        degree: "Intermediate Education (MPC)",
        institution: "Sri Chaitanya College",
        location: "Vijayawada, Andhra Pradesh",
        period: "2021 – 2023",
        isPrimary: false
      },
      {
        degree: "Secondary School Certificate (SSC)",
        institution: "Bhashyam High School",
        location: "Adoni, Andhra Pradesh",
        period: "2020 – 2021",
        isPrimary: false
      }
    ]);

    // Seed Skills
    await Skill.insertMany([
      {
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
        category: "Data Science",
        iconName: "BarChart3",
        items: [
          { name: "Data Analysis", icon: "PieChart" },
          { name: "Data Visualization", icon: "LineChart" }
        ]
      },
      {
        category: "Cloud Computing",
        iconName: "Cloud",
        items: [{ name: "AWS", icon: "CloudRain" }]
      },
      {
        category: "Tools",
        iconName: "Wrench",
        items: [
          { name: "Git", icon: "GitBranch" },
          { name: "GitHub", icon: "Github" }
        ]
      },
      {
        category: "Soft Skills",
        iconName: "Users",
        items: [
          { name: "Communication", icon: "MessageSquare" },
          { name: "Active Listener", icon: "Ear" },
          { name: "Hard Working", icon: "Zap" }
        ]
      }
    ]);

    console.log('[Seed] Database populated successfully with Prabodh Badimi portfolio records!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
