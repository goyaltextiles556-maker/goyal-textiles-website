
import { MongoClient } from 'mongodb';

// Create a global variable to hold the client
// This will persist across requests in a long-running server process
let mongoClient: MongoClient | null = null;

/**
 * Returns a connected MongoDB client instance.
 * It assumes connectMongoClient has been called successfully on startup.
 * 
 * @param uri - The MongoDB connection string (only used for the initial connection).
 * @returns A promise that resolves to a MongoClient instance.
 */
export async function getMongoClient(uri?: string): Promise<MongoClient> {
  if (mongoClient) {
    return mongoClient;
  }

  if (!uri) {
    throw new Error('MongoDB URI is not defined. Please check your .env file and server startup logic.');
  }

  // If no client, create a new one
  mongoClient = new MongoClient(uri);

  try {
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    return mongoClient;
  } catch (e) {
    console.error("Failed to connect to MongoDB Atlas", e);
    // If connection fails, reset the client to allow retries on the next attempt
    mongoClient = null;
    throw e;
  }
}
