import express from 'express';
import {
  getProjects,
  getExperiences,
  getEducation,
  getSkills
} from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/projects', getProjects);
router.get('/experience', getExperiences);
router.get('/education', getEducation);
router.get('/skills', getSkills);

export default router;
