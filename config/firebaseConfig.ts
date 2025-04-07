import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let db: Firestore;

if (process.env.NODE_ENV === 'test') {
  // Mock configuration for tests
  db = {
    collection: jest.fn() as any
  } as Firestore;
} else {
  // Real configuration for development/production
  import("../project---fashion-item-api-firebase-adminsdk-fbsvc-40dcb29851.json")
    .then(serviceAccount => {
      initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      });
      db = getFirestore();
    })
    .catch(error => {
      console.error("Firebase initialization error:", error);
      process.exit(1);
    });
}

export { db };