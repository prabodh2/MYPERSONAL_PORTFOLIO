import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb+srv://kings99901_db_user:WW9cp4g6H4i6o5nY@portfolio.xsvtgz3.mongodb.net/?appName=Portfolio';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning] Direct connection pending: ${error.message}`);
    console.warn('[MongoDB Info] Backend running with dynamic in-memory seed fallbacks for smooth client interaction.');
    return null;
  }
};
