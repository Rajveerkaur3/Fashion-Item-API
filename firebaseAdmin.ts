// firebaseAdmin.ts (root)
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let db: Firestore | null = null;

if (process.env.NODE_ENV !== 'test') {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : require("./serviceAccountKey.json");
      
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount)
    });
    db = getFirestore();
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { db };