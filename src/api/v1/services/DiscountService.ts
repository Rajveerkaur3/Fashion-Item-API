import { Discount } from '../models/DiscountModel';
import { db } from "../../../../config/firebaseConfig";  
import { 
  createDocument, 
  getDocuments, 
  getDocumentById, 
  updateDocument, 
  deleteDocument 
} from "../repositories/firestoreRepository";  
import { ServiceError, NotFoundError } from "../models/customError";
import { DocumentSnapshot } from 'firebase-admin/firestore';
import { QuerySnapshot } from "firebase-admin/firestore";

// Define the collection name for Discounts
const COLLECTION = "discounts";

// Get all discounts from Firestore
export const getAllDiscounts = async (): Promise<Discount[]> => {
  const snapshot = await getDocuments(COLLECTION); // Get all documents from the collection
  return snapshot.docs.map((doc: DocumentSnapshot) => {
    const data = doc.data() as Discount; // Extract discount data
    const { id, ...rest } = data; // Destructure to prevent overwriting the id
    return { id: doc.id, ...rest }; // Add id to the rest of the data
  });
};

// Create a new discount in Firestore
export const createDiscount = async (discount: Discount): Promise<Discount> => {
  const { id, ...rest } = discount; // Extract the id
  const docId = await createDocument<Discount>(COLLECTION, rest); // Create document without id
  const discountData = { id: docId, ...rest }; // Attach generated id to data
  await updateDocument<Discount>(COLLECTION, docId, discountData); // Optionally update the document
  return { id: docId, ...rest }; // Return the discount with the id
};

// Get a discount by its ID from Firestore
export const getDiscountById = async (id: string): Promise<Discount | null> => {
  try {
    const doc = await getDocumentById(COLLECTION, id) as DocumentSnapshot<Discount> | null;

    if (!doc || !doc.exists) {
      return null; // Return null if the document doesn't exist
    }

    const data = doc.data(); // Extract the data from the document
    if (!data) {
      return null; // If no data, return null
    }

    // Return the discount with its id
    return { ...data, id: doc.id };
  } catch (error) {
    console.error('Error getting discount by ID:', error);
    return null;
  }
};

// Update a discount in Firestore
export const updateDiscount = async (id: string, discount: Partial<Discount>): Promise<Discount> => {
  try {
    await updateDocument<Discount>(COLLECTION, id.toString(), discount); // Update the discount document
    const updatedDiscount = await getDiscountById(id);
    
    if (!updatedDiscount) {
      throw new NotFoundError(`Discount with ID ${id} not found`);
    }

    return updatedDiscount;
  } catch (error) {
    console.error('Failed to update discount:', error);
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new ServiceError(`${(error as Error).message}`);
  }
};

// Delete a discount from Firestore
export const deleteDiscount = async (id: string): Promise<Discount | null> => {
  try {
    const stringId = id.toString();
    const docRef = db.collection(COLLECTION).doc(stringId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return null; // Return null if the discount doesn't exist
    }

    const deletedDiscount = docSnapshot.data() as Discount;
    await docRef.delete(); // Delete the discount document
    return deletedDiscount; // Return the deleted discount object
  } catch (error) {
    console.error(`Error deleting discount with ID ${id}:`, error);
    return null; // Return null in case of any errors
  }
};
