import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../project---fashion-item-api-firebase-adminsdk-fbsvc-40dcb29851.json";

initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export { db };