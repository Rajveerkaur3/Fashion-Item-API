import { UserReview } from '../models/UserReviewModel';
import { db } from "../../../../config/firebaseConfig";  // Your Firebase config
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
} from "../repositories/firestoreRepository";
import { ServiceError, NotFoundError } from "../models/customError";
import { DocumentSnapshot } from 'firebase-admin/firestore';  // Importing types from Firebase
import { QuerySnapshot } from "firebase-admin/firestore";

// Define the collection name for User Reviews
const COLLECTION = "userReviews";

// Get all user reviews from Firestore
export const getAllUserReviews = async (): Promise<UserReview[]> => {
  const snapshot = await getDocuments(COLLECTION);  // Get all documents from the collection
  return snapshot.docs.map((doc: DocumentSnapshot) => {
    const data = doc.data() as UserReview;  // Extract user review data
    const { id, ...rest } = data;  // Destructure to prevent overwriting the id
    return { id: doc.id, ...rest };  // Add id to the rest of the data
  });
};

// Create a new user review in Firestore
export const createUserReview = async (userReview: UserReview): Promise<UserReview> => {
  const { id, ...rest } = userReview;  // Extract the id
  const docId = await createDocument<UserReview>(COLLECTION, rest);  // Create document without id
  const reviewData = { id: docId, ...rest };  // Attach generated id to data
  await updateDocument<UserReview>(COLLECTION, docId, reviewData);  // Optionally update the document
  return { id: docId, ...rest };  // Return the review with the id
};

// Get a user review by its ID from Firestore
export const getUserReviewById = async (id: string): Promise<UserReview | null> => {
  try {
    const doc = await getDocumentById(COLLECTION, id) as DocumentSnapshot<UserReview> | null;

    if (!doc || !doc.exists) {
      return null;  // Return null if the document doesn't exist
    }

    const data = doc.data();  // Extract the data from the document
    if (!data) {
      return null;  // If no data, return null
    }

    // Return the user review with its id
    return { ...data, id: doc.id };
  } catch (error) {
    console.error('Error getting user review by ID:', error);
    return null;
  }
};

// Update a user review in Firestore
export const updateUserReview = async (id: string, userReview: Partial<UserReview>): Promise<UserReview> => {
  try {
    await updateDocument<UserReview>(COLLECTION, id.toString(), userReview);  // Update the user review document
    const updatedReview = await getUserReviewById(id);

    if (!updatedReview) {
      throw new NotFoundError(`User review with ID ${id} not found`);  // Throw an error if review not found
    }

    return updatedReview;
  } catch (error) {
    console.error('Failed to update user review:', error);
    if (error instanceof NotFoundError) {
      throw error;  // Rethrow NotFoundError if it occurs
    }
    throw new ServiceError(`${(error as Error).message}`);
  }
};

// Delete a user review from Firestore
export const deleteUserReview = async (id: string): Promise<UserReview | null> => {
  try {
    const stringId = id.toString();
    const docRef = db.collection(COLLECTION).doc(stringId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return null;  // Return null if the user review doesn't exist
    }

    const deletedReview = docSnapshot.data() as UserReview;
    await docRef.delete();  // Delete the user review document
    return deletedReview;  // Return the deleted user review object
  } catch (error) {
    console.error(`Error deleting user review with ID ${id}:`, error);
    return null;  // Return null in case of any errors
  }
};
