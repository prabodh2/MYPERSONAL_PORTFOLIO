import express from 'express';
import { body } from 'express-validator';
import { submitContactForm, getContactMessages, retryContactSync } from '../controllers/contactController.js';

const router = express.Router();

// Validation middleware for POST /api/contact
const contactValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('phone').trim().notEmpty().withMessage('Contact number is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 5 }).withMessage('Message must be at least 5 characters long')
];

router.post('/', contactValidationRules, submitContactForm);
router.get('/', getContactMessages);
router.post('/:id/sync', retryContactSync);

export default router;

