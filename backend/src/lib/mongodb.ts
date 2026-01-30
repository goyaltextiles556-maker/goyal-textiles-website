
import { MongoClient } from 'mongodb';

// Create a global variable to hold the client
// This will persist across requests in a long-running server process
let mongoClient: MongoClient | null = null;

/**
 * Returns a connected MongoDB client instance.
 * If a connection already exists, it returns the existing client.
 * Otherwise, it creates a new connection and returns the client.
 * 
 * @param uri - The MongoDB connection string.
 * @returns A promise that resolves to a MongoClient instance.
 */
export async function getMongoClient(uri: string): Promise<MongoClient> {
  if (mongoClient) {
    return mongoClient;
  }

  if (!uri) {
    throw new Error('MongoDB URI is not defined. Please check your .env file.');
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
