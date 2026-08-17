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

// Page Dimensions
// A4 is 595.28 x 841.89 points
// Margins: left=36, right=559 (width = 523.28 points)
const doc = new PDFDocument({
  size: 'A4',
  margin: 36
});

const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

const leftMargin = 36;
const rightMargin = 559;
const contentWidth = 523;

const fontRegular = 'Helvetica';
const fontBold = 'Helvetica-Bold';
const fontOblique = 'Helvetica-Oblique';

// Header Name
doc.font(fontBold).fontSize(20).fillColor('#000000').text('Prabodh Badimi', leftMargin, 36, { width: contentWidth, align: 'center' });

// Header Title
doc.font(fontBold).fontSize(13).fillColor('#000000').text('Full Stack Developer', leftMargin, doc.y + 2, { width: contentWidth, align: 'center' });

// Contact Info
doc.font(fontRegular).fontSize(9.5).fillColor('#000000').text('prabodhbadimi1@gmail.com | 8309009913 | prabodh2 | prabodh-badimi | Kharghar, Maharashtra', leftMargin, doc.y + 4, { width: contentWidth, align: 'center' });

doc.y += 12;

function drawSectionHeader(title) {
  const currentY = doc.y;
  doc.font(fontBold).fontSize(11).fillColor('#000000').text(title.toUpperCase(), leftMargin, currentY, { width: contentWidth });
  const lineY = doc.y + 2;
  doc.moveTo(leftMargin, lineY).lineTo(rightMargin, lineY).strokeColor('#000000').lineWidth(0.75).stroke();
  doc.y = lineY + 6;
}

// 1. SUMMARY
drawSectionHeader('Summary');
doc.font(fontOblique).fontSize(9).fillColor('#111111').text(
  "I'm a Fourth-year B.Tech CSE student and Full Stack Developer with hands-on experience building responsive, user-focused web applications using MERN Stack Dev. Proven track record across two internships developing e-commerce and company websites from scratch, optimizing performance, and collaborating with cross-functional teams. Skilled in clean, maintainable code and passionate about delivering scalable digital solutions.",
  leftMargin, doc.y, { width: contentWidth, align: 'justify', lineGap: 1.5 }
);

doc.y += 10;

// 2. EDUCATION
drawSectionHeader('Education');

const eduItems = [
  { text: '•  Bachelor of Technology in Computer Science and Technology, ITM Skills University', dates: '2023-2027' },
  { text: '•  Sri Chaitanya College, Vijayawada, Andhra Pradesh', dates: '2021-2023' },
  { text: '•  Bhashyam High School, Adoni, Andhra Pradesh', dates: '2020-2021' }
];

eduItems.forEach(item => {
  const yPos = doc.y;
  doc.font(fontBold).fontSize(9).fillColor('#000000').text(item.text, leftMargin, yPos, { width: 440 });
  doc.font(fontBold).fontSize(9).fillColor('#000000').text(item.dates, 470, yPos, { width: 89, align: 'right' });
  doc.y = yPos + 14;
});

doc.y += 4;

// 3. TECHNICAL EXPERIENCE
drawSectionHeader('Technical Experience');

// Experience 1
let yPos = doc.y;
doc.font(fontBold).fontSize(9.5).fillColor('#000000').text('CODEVERSEBYSAIKUBER :', leftMargin, yPos);
doc.font(fontRegular).fontSize(9.5).fillColor('#000000').text(' Frontend Developer Intern (Remote) [August, 2025 – December, 2025]', leftMargin + 155, yPos);
doc.y = yPos + 14;

const exp1Bullets = [
  'Developed a company website from scratch with a focus on responsive design and intuitive user experience.',
  'Built user interfaces using modern frontend technologies, ensuring clean and maintainable code.',
  'Followed best practices to improve performance, scalability, and overall application quality.',
  'Worked closely with designers and backend developers to deliver accurate and production-ready features.',
  'Tested and debugged components to ensure smooth functionality across different devices and browsers.'
];

exp1Bullets.forEach(b => {
  doc.font(fontRegular).fontSize(9).fillColor('#222222').text(`•  ${b}`, leftMargin + 12, doc.y, { width: contentWidth - 12, lineGap: 1 });
  doc.y += 1;
});

doc.y += 6;

// Experience 2
yPos = doc.y;
doc.font(fontBold).fontSize(9.5).fillColor('#000000').text('Funds And Toil Private Limited :', leftMargin, yPos);
doc.font(fontRegular).fontSize(9.5).fillColor('#000000').text(' Full Stack Developer Intern (Remote) [May, 2026] – [July, 2026]', leftMargin + 175, yPos);
doc.y = yPos + 14;

const exp2Bullets = [
  'Developed and implemented a full-stack e-commerce website from scratch using the MERN stack..',
  'Built responsive and user-friendly interfaces using React.js, focusing on performance and seamless user experience.',
  'Developed backend APIs and server-side functionality using Node.js and Express.js.',
  'Integrated MongoDB for efficient data management and implemented core e-commerce functionalities.'
];

exp2Bullets.forEach(b => {
  doc.font(fontRegular).fontSize(9).fillColor('#222222').text(`•  ${b}`, leftMargin + 12, doc.y, { width: contentWidth - 12, lineGap: 1 });
  doc.y += 1;
});

doc.y += 8;

// 4. SKILLS SUMMARY
drawSectionHeader('Skills Summary');

const skills = [
  { label: '•  Technical Skills:', val: 'C++, JavaScript, CSS, HTML, React, Python, Flutter, Node JS, Express JS, MongoDB' },
  { label: '•  AI:', val: 'AI Research & Development (R&D)' },
  { label: '•  Cloud Computing:', val: 'AWS' },
  { label: '•  Tools:', val: 'Git, Github' },
  { label: '•  Soft Skills:', val: 'Communication, Active listener, Hard Working' }
];

skills.forEach(s => {
  const lineY = doc.y;
  doc.font(fontBold).fontSize(9).fillColor('#000000').text(s.label, leftMargin, lineY, { width: 130 });
  doc.font(fontRegular).fontSize(9).fillColor('#111111').text(s.val, leftMargin + 130, lineY, { width: contentWidth - 130 });
  doc.y = lineY + 13;
});

doc.y += 6;

// 5. PROJECTS
drawSectionHeader('Projects');

// Project 1
doc.font(fontBold).fontSize(9.5).fillColor('#000000').text('•  Paisa Pakad:', leftMargin, doc.y);
doc.y += 13;
[
  'Worked on a secure digital payment and money management application for easy transactions and savings.',
  'Contributed to implementing features for sending, receiving, and tracking money in a user-friendly interface.',
  'Focused on improving security, performance, and overall user experience.'
].forEach(b => {
  doc.font(fontRegular).fontSize(9).fillColor('#222222').text(`•  ${b}`, leftMargin + 18, doc.y, { width: contentWidth - 18, lineGap: 1 });
  doc.y += 1;
});

doc.y += 4;

// Project 2
doc.font(fontBold).fontSize(9.5).fillColor('#000000').text('•  Cars24 (Clone):', leftMargin, doc.y);
doc.y += 13;
[
  'Built a web application that enables users to buy, sell, and exchange used cars.',
  'Designed features such as car listings, price estimation, and smooth user interaction.',
  'Ensured responsive design and efficient performance for a hassle-free user experience.'
].forEach(b => {
  doc.font(fontRegular).fontSize(9).fillColor('#222222').text(`•  ${b}`, leftMargin + 18, doc.y, { width: contentWidth - 18, lineGap: 1 });
  doc.y += 1;
});

doc.y += 4;

// Project 3
doc.font(fontBold).fontSize(9.5).fillColor('#000000').text('•  Food Delivery App :', leftMargin, doc.y);
doc.y += 13;
[
  'Developed a full-stack food ordering application using Flutter for the frontend and Node.js for the backend.',
  'Implemented role-based access control for Users, Restaurant Owners, and Admins.',
  'Built core features for food ordering, restaurant management, and administrative operations with a focus on usability and scalability.'
].forEach(b => {
  doc.font(fontRegular).fontSize(9).fillColor('#222222').text(`•  ${b}`, leftMargin + 18, doc.y, { width: contentWidth - 18, lineGap: 1 });
  doc.y += 1;
});

doc.end();

stream.on('finish', () => {
  fs.copyFileSync(pdfPath, pdfPath2);
  console.log(`[PDF Generator] Successfully generated perfectly aligned PDF: ${pdfPath}`);
});
