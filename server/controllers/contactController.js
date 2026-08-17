import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import mongoose from 'mongoose';
import { syncContactToGoogleSheets } from '../services/googleSheetsService.js';

// Temporary in-memory log for local fallback mode
const inMemoryContactStore = [];

export const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.path, msg: err.msg }))
    });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
    if (mongoose.connection.readyState === 1) {
      const newContact = new Contact({ name, email, phone, subject, message });
      await newContact.save();
      console.log(`[Contact] Saved: ${newContact._id}`);

      // Perform Google Sheets sync asynchronously / safely
      try {
        await syncContactToGoogleSheets(newContact);
      } catch (syncErr) {
        console.error(`[Google Sheets] Unexpected error during sync attempt:`, syncErr.message);
      }

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully! Prabodh will get back to you soon.',
        data: {
          id: newContact._id,
          name: newContact.name,
          email: newContact.email,
          phone: newContact.phone,
          createdAt: newContact.createdAt
        }
      });
    } else {
      const fallbackEntry = { id: `msg_${Date.now()}`, name, email, phone, subject, message, createdAt: new Date() };
      inMemoryContactStore.push(fallbackEntry);
      return res.status(201).json({
        success: true,
        message: 'Message received! Prabodh will get back to you soon.',
        data: fallbackEntry
      });
    }
  } catch (error) {
    console.error('Error saving contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing contact message. Please try again later.'
    });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }
    return res.json({ success: true, count: inMemoryContactStore.length, data: inMemoryContactStore });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const retryContactSync = async (req, res) => {
  const { id } = req.params;

  // Protect retry endpoint if ADMIN_SYNC_SECRET is set in environment
  const adminSecret = process.env.ADMIN_SYNC_SECRET;
  if (adminSecret && req.headers['x-admin-secret'] !== adminSecret) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Invalid administrative secret key.'
    });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable.'
      });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact record not found.'
      });
    }

    const syncResult = await syncContactToGoogleSheets(contact);
    const updatedContact = await Contact.findById(id);

    return res.json({
      success: syncResult.success,
      message: syncResult.alreadySynced
        ? 'Contact is already synced.'
        : syncResult.success
        ? 'Synchronization successful.'
        : 'Synchronization failed.',
      syncStatus: updatedContact.sheetSyncStatus,
      syncedAt: updatedContact.sheetSyncedAt,
      error: updatedContact.sheetSyncError
    });
  } catch (error) {
    console.error(`[Contact Retry Sync Error]:`, error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrying contact synchronization.'
    });
  }
};

