import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

try {
  await mongoose.connect(process.env.ATLAS_URI, {
    dbName: 'sample_training',
  });
  console.log('Successfully connected to MongoDB via Mongoose');
} catch (error) {
  console.error('Not connected', error);
}

export default mongoose;
