
import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    // Add serverApi options for compatibility with modern MongoDB Atlas clusters
    // FIX: Add type assertion to ConnectOptions to allow serverApi property.
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    } as ConnectOptions);
    console.log(`Successfully connected to MongoDB Atlas: ${conn.connection.host}`);
  } catch (error) {
    console.error(`FATAL: Could not connect to MongoDB.`, error);
    // Re-throw the error to be caught by the server's startup logic
    throw error;
  }
};

export default connectDB;