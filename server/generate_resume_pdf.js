import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPublicDir = path.join(__dirname, '../client/public');
if (!fs.existsSync(clientPublicDir)) {
  fs.mkdirSync(clientPublicDir, { recursive: true });
}

const pdfPath = path.join(clientPublicDir, 'Prabodh_Badimi_Resume.pdf');
const pdfPath2 = path.join(clientPublicDir, 'resume.pdf');

// Page Dimensions: A4 is 595.28 x 841.89 pt
const doc = new PDFDocument({
  size: 'A4',
  margin: 32
});

const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

const leftMargin = 36;
const rightMargin = 559;
const contentWidth = 523;

const fontRegular = 'Helvetica';
const fontBold = 'Helvetica-Bold';
const fontOblique = 'Helvetica-Oblique';

const primaryColor = '#1e40af'; // Professional deep blue accent
const textColor = '#000000';
const textSecondary = '#1f2937';

// 1. Header
doc.font(fontBold).fontSize(18).fillColor(primaryColor).text('PRABODH BADIMI', leftMargin, 30, { width: contentWidth, align: 'center' });
doc.font(fontBold).fontSize(11.5).fillColor(primaryColor).text('FULL STACK DEVELOPER', leftMargin, doc.y + 2, { width: contentWidth, align: 'center' });
doc.font(fontRegular).fontSize(8.5).fillColor(textSecondary).text('React.js | Node.js | Express.js | MongoDB | REST APIs | JavaScript', leftMargin, doc.y + 3, { width: contentWidth, align: 'center' });
doc.font(fontRegular).fontSize(8.5).fillColor(textSecondary).text('8309009913 | Navi Mumbai, India | Email | Linkedin | Github | Portfolio', leftMargin, doc.y + 3, { width: contentWidth, align: 'center' });

doc.y += 8;

function drawSectionHeader(title) {
  const currentY = doc.y;
  doc.font(fontBold).fontSize(10.5).fillColor(primaryColor).text(title.toUpperCase(), leftMargin, currentY, { width: contentWidth });
  const lineY = doc.y + 2;
  doc.moveTo(leftMargin, lineY).lineTo(rightMargin, lineY).strokeColor(primaryColor).lineWidth(0.8).stroke();
  doc.y = lineY + 5;
}

// 1. SUMMARY
drawSectionHeader('SUMMARY');
doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text(
  'Full Stack Developer and B.Tech Computer Science student with hands-on experience building responsive web applications and e-commerce platforms using the MERN stack. Skilled in React.js, Node.js, Express.js, MongoDB, JavaScript, RESTful APIs, responsive UI development, backend integration, testing, debugging, and performance optimization. Experienced in building applications from scratch and delivering scalable, production-ready solutions.',
  leftMargin, doc.y, { width: contentWidth, align: 'justify', lineGap: 1.2 }
);

doc.y += 6;

// 2. WORK EXPERIENCE
drawSectionHeader('WORK EXPERIENCE');

// Company 1
let yPos = doc.y;
doc.font(fontBold).fontSize(9).fillColor(textColor).text('CODEVERSEBYSAIKUBER', leftMargin, yPos);
doc.font(fontBold).fontSize(8.5).fillColor('#4b5563').text('Aug–Dec 2025', 460, yPos, { width: 99, align: 'right' });
yPos = doc.y + 11;
doc.font(fontBold).fontSize(8.5).fillColor('#374151').text('Frontend Developer Intern', leftMargin, yPos);
doc.font(fontOblique).fontSize(8.5).fillColor('#4b5563').text('Remote, India', 460, yPos, { width: 99, align: 'right' });
doc.y = yPos + 11;

const exp1Bullets = [
  'Developed a company website from scratch with a focus on responsive design and intuitive user experience.',
  'Built user interfaces using modern frontend technologies, following clean and maintainable coding practices.',
  'Applied best practices to improve performance, scalability, and overall application quality.',
  'Collaborated with designers and backend developers to deliver accurate, production-ready features.',
  'Tested and debugged components to ensure reliable functionality across devices and browsers.'
];

exp1Bullets.forEach(b => {
  doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text(`•  ${b}`, leftMargin + 8, doc.y, { width: contentWidth - 8, lineGap: 1 });
  doc.y += 1;
});

doc.y += 5;

// Company 2
yPos = doc.y;
doc.font(fontBold).fontSize(9).fillColor(textColor).text('Funds And Toil Private Limited', leftMargin, yPos);
doc.font(fontBold).fontSize(8.5).fillColor('#4b5563').text('May–Jul 2026', 460, yPos, { width: 99, align: 'right' });
yPos = doc.y + 11;
doc.font(fontBold).fontSize(8.5).fillColor('#374151').text('Full Stack Developer Intern', leftMargin, yPos);
doc.font(fontOblique).fontSize(8.5).fillColor('#4b5563').text('Remote, India', 460, yPos, { width: 99, align: 'right' });
doc.y = yPos + 11;

const exp2Bullets = [
  'Developed and implemented a full-stack e-commerce website from scratch using the MERN stack.',
  'Built responsive, user-friendly interfaces with React.js, focusing on performance and seamless user experience.',
  'Developed backend APIs and server-side functionality using Node.js and Express.js.',
  'Integrated MongoDB for efficient data management and implemented core e-commerce functionality.'
];

exp2Bullets.forEach(b => {
  doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text(`•  ${b}`, leftMargin + 8, doc.y, { width: contentWidth - 8, lineGap: 1 });
  doc.y += 1;
});

doc.y += 6;

// 3. PROJECTS
drawSectionHeader('PROJECTS');

// Project 1
doc.font(fontBold).fontSize(9).fillColor(textColor).text('Cars24 Clone | Used-Car Marketplace Web Application', leftMargin, doc.y);
doc.y += 11;
[
  'Built a used-car marketplace web application enabling users to browse, list, buy, sell, and exchange vehicles.',
  'Implemented car listings, price estimation, search-oriented user flows, and responsive user interface features.',
  'Focused on responsive design, performance optimization, usability, and a smooth end-to-end user experience.'
].forEach(b => {
  doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text(`•  ${b}`, leftMargin + 8, doc.y, { width: contentWidth - 8, lineGap: 1 });
  doc.y += 1;
});

doc.y += 5;

// Project 2
doc.font(fontBold).fontSize(9).fillColor(textColor).text('Food Delivery Application | Full Stack', leftMargin, doc.y);
doc.y += 11;
[
  'Developed a full-stack food ordering application using Flutter for the frontend and Node.js for the backend.',
  'Implemented role-based access control for Users, Restaurant Owners, and Administrators.',
  'Built core food ordering, restaurant management, and administrative workflows with a focus on usability, maintainability, and scalability.'
].forEach(b => {
  doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text(`•  ${b}`, leftMargin + 8, doc.y, { width: contentWidth - 8, lineGap: 1 });
  doc.y += 1;
});

doc.y += 6;

// 4. TECHNICAL SKILLS
drawSectionHeader('TECHNICAL SKILLS');

const skillsList = [
  { label: 'Programming Languages:', val: 'C++, Python, JavaScript, HTML5, CSS3' },
  { label: 'Frontend:', val: 'React.js, Flutter, Responsive Web Design' },
  { label: 'Backend:', val: 'Node.js, Express.js, RESTful APIs' },
  { label: 'Database:', val: 'MongoDB' },
  { label: 'Cloud & Tools:', val: 'AWS, Git, GitHub' },
  { label: 'Core:', val: 'Full Stack Development, API Integration, Debugging, Performance Optimization' }
];

skillsList.forEach(s => {
  const lineY = doc.y;
  doc.font(fontBold).fontSize(8.5).fillColor(textColor).text(s.label, leftMargin, lineY, { width: 145 });
  doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text(s.val, leftMargin + 145, lineY, { width: contentWidth - 145 });
  doc.y = lineY + 11.5;
});

doc.y += 4;

// 5. CERTIFICATIONS
drawSectionHeader('CERTIFICATIONS');

yPos = doc.y;
doc.font(fontBold).fontSize(8.5).fillColor(textColor).text('AWS Cloud Practitioner Essentials', leftMargin, yPos);
doc.y = yPos + 10;
doc.font(fontRegular).fontSize(8).fillColor('#4b5563').text('Amazon Web Services (AWS) — Issued Feb 2025', leftMargin, doc.y);

doc.y += 4;
yPos = doc.y;
doc.font(fontBold).fontSize(8.5).fillColor(textColor).text('Cloud Essentials Knowledge Badge Assessment', leftMargin, yPos);
doc.y = yPos + 10;
doc.font(fontRegular).fontSize(8).fillColor('#4b5563').text('Amazon Web Services (AWS) — Issued Feb 2025', leftMargin, doc.y);

doc.y += 6;

// 6. EDUCATION
drawSectionHeader('EDUCATION');

const eduList = [
  { title: 'ITM Skills University — B.Tech in Computer Science and Technology', dates: '2023 – 2027' },
  { title: 'Sri Chaitanya College, Vijayawada, Andhra Pradesh — Class 12', dates: '2021 – 2023' },
  { title: 'Bhashyam High School, Adoni, Andhra Pradesh — Class 10', dates: '2020 – 2021' }
];

eduList.forEach(item => {
  const lineY = doc.y;
  doc.font(fontBold).fontSize(8.5).fillColor(textColor).text(item.title, leftMargin, lineY, { width: 440 });
  doc.font(fontBold).fontSize(8.5).fillColor('#4b5563').text(item.dates, 460, lineY, { width: 99, align: 'right' });
  doc.y = lineY + 12;
});

doc.y += 4;

// 7. INTERESTS
drawSectionHeader('INTERESTS');
doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text('Cybersecurity, Ethical Hacking, Web Application Security, Secure Coding', leftMargin, doc.y);

doc.y += 14;

// 8. LANGUAGES
drawSectionHeader('LANGUAGES');
doc.font(fontRegular).fontSize(8.5).fillColor(textColor).text('English, Hindi, Kannada, Telugu', leftMargin, doc.y);

doc.end();

stream.on('finish', () => {
  fs.copyFileSync(pdfPath, pdfPath2);
  console.log(`[PDF Generator] Successfully generated updated PDF: ${pdfPath}`);
});

