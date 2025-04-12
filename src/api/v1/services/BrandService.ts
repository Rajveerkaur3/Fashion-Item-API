import { Brand } from '../models/BrandModel';  
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

// Define the collection name for Brands
const COLLECTION = "brands";

// Get all brands from Firestore
export const getAllBrands = async (): Promise<Brand[]> => {
  const snapshot = await getDocuments(COLLECTION);  // Get all documents from the collection
  return snapshot.docs.map((doc: DocumentSnapshot) => {
    const data = doc.data() as Brand;  // Extract brand data
    const { id, ...rest } = data;  // Destructure to prevent overwriting the id
    return { id: doc.id, ...rest };  // Add id to the rest of the data
  });
};

// Create a new brand in Firestore
export const createBrand = async (brand: Brand): Promise<Brand> => {
  const { id, ...rest } = brand;  // Extract the id
  const docId = await createDocument<Brand>(COLLECTION, rest);  // Create document without id
  const brandData = { id: docId, ...rest };  // Attach generated id to data
  await updateDocument<Brand>(COLLECTION, docId, brandData);  // Optionally update the document
  return { id: docId, ...rest };  // Return the brand with the id
};

// Get a brand by its ID from Firestore
export const getBrandById = async (id: string): Promise<Brand | null> => {
  try {
    const doc = await getDocumentById(COLLECTION, id) as DocumentSnapshot<Brand> | null;

    if (!doc || !doc.exists) {
      return null;  // Return null if the document doesn't exist
    }

    const data = doc.data();  // Extract the data from the document
    if (!data) {
      return null;  // If no data, return null
    }

    // Return the brand with its id
    return { ...data, id: doc.id };
  } catch (error) {
    console.error('Error getting brand by ID:', error);
    return null;
  }
};

// Update a brand in Firestore
export const updateBrand = async (id: string, brand: Partial<Brand>): Promise<Brand> => {
  try {
    await updateDocument<Brand>(COLLECTION, id.toString(), brand);  // Update the brand document
    const updatedBrand = await getBrandById(id);
    
    if (!updatedBrand) {
      throw new NotFoundError(`Brand with ID ${id} not found`);  // Throw an error if brand not found
    }

    return updatedBrand;
  } catch (error) {
    console.error('Failed to update brand:', error);
    if (error instanceof NotFoundError) {
      throw error;  // Rethrow NotFoundError if it occurs
    }
    throw new ServiceError(`${(error as Error).message}`);
  }
};

// Delete a brand from Firestore
export const deleteBrand = async (id: string): Promise<Brand | null> => {
  try {
    const stringId = id.toString();
    const docRef = db.collection(COLLECTION).doc(stringId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return null;  // Return null if the brand doesn't exist
    }

    const deletedBrand = docSnapshot.data() as Brand;
    await docRef.delete();  // Delete the brand document
    return deletedBrand;  // Return the deleted brand object
  } catch (error) {
    console.error(`Error deleting brand with ID ${id}:`, error);
    return null;  // Return null in case of any errors
  }
};
