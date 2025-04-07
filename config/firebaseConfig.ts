import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Parse the Firebase credentials from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

// Get Firestore instance
const db: Firestore = getFirestore();

export { db };
