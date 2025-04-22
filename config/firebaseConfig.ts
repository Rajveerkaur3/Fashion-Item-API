import { initializeApp, cert, ServiceAccount, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = require("../project---fashion-item-api-firebase-adminsdk-fbsvc-39755f1409.json");


// Initialize only once
if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}

const db = getFirestore();
const auth = getAuth();

export { db, auth };
