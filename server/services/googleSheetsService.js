import { google } from 'googleapis';
import Contact from '../models/Contact.js';

/**
 * Initialize Google Auth JWT Client
 */
const getGoogleAuthClient = () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Google service account credentials (GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY) are missing in environment variables.');
  }

  // Ensure unescaped newlines in private key
  privateKey = privateKey.replace(/\\n/g, '\n');
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  return auth;
};

/**
 * Append a single contact document to Google Sheets
 * @param {Object} contact 
 * @returns {Promise<Object>}
 */
export const appendContactToSheet = async (contact) => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1GRX1wPpDGd2nmggwXwiXezymsR8PVQhyYfzX6hyHsCQ';
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is missing.');
  }

  const auth = getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const dateStr = contact.createdAt ? new Date(contact.createdAt).toISOString() : new Date().toISOString();
  
  // Format row: [ Date | Name | Email | Subject | Message | Status ]
  const rowValues = [
    dateStr,
    contact.name || '',
    contact.email || '',
    contact.subject || '',
    contact.message || '',
    'synced'
  ];

  const range = `${sheetName}!A:F`;

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [rowValues]
    }
  });

  return response.data;
};

/**
 * Sync contact to Google Sheets and update status in MongoDB Atlas
 * @param {Object} contactDoc - Mongoose contact document or object with _id
 * @returns {Promise<Object>} Sync result
 */
export const syncContactToGoogleSheets = async (contactDoc) => {
  if (!contactDoc || !contactDoc._id) {
    return { success: false, error: 'Invalid contact document provided for sync.' };
  }

  const contactId = contactDoc._id.toString();

  // Prevent duplicate sync if already synced
  if (contactDoc.sheetSyncStatus === 'synced') {
    return {
      success: true,
      alreadySynced: true,
      message: `[Google Sheets] Contact ${contactId} is already synced.`
    };
  }

  try {
    await appendContactToSheet(contactDoc);

    // Update MongoDB record status
    await Contact.findByIdAndUpdate(contactId, {
      sheetSyncStatus: 'synced',
      sheetSyncedAt: new Date(),
      sheetSyncError: null
    });

    console.log(`[Google Sheets] Sync successful: ${contactId}`);
    return { success: true, contactId };

  } catch (error) {
    const safeErrorMsg = error.message || 'Unknown error appending to Google Sheets.';
    console.error(`[Google Sheets] Sync failed: ${contactId} - ${safeErrorMsg}`);

    // Update MongoDB record status to failed without rolling back or deleting
    try {
      await Contact.findByIdAndUpdate(contactId, {
        sheetSyncStatus: 'failed',
        sheetSyncError: safeErrorMsg
      });
    } catch (dbErr) {
      console.error(`[MongoDB] Failed to update sync error status for ${contactId}:`, dbErr.message);
    }

    return {
      success: false,
      contactId,
      error: safeErrorMsg
    };
  }
};
