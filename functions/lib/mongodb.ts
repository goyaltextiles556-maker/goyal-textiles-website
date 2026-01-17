
import { MongoClient } from 'mongodb';

// Create a global variable to hold the client
// In a serverless environment, this can persist across function invocations
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

  // If no client, create a new one
  mongoClient = new MongoClient(uri);

  try {
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    return mongoClient;
  } catch (e) {
    console.error("Failed to connect to MongoDB Atlas", e);
    // If connection fails, reset the client to allow retries on next invocation
    mongoClient = null;
    throw e;
  }
}
