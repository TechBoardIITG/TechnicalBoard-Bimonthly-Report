import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tb_progress_reports';
  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    dbName: 'tb_progress_reports',
  });
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
};
