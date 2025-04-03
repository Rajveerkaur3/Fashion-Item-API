import { FashionItem } from '../models/FashionItemModel';
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

// Define the collection name for FashionItems
const COLLECTION = "fashionItems";

// Get all fashion items from Firestore
export const getAllFashionItems = async (): Promise<FashionItem[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc: DocumentSnapshot) => {  
        const data = doc.data() as FashionItem;
        const { id, ...rest } = data;  // Destructure to avoid overwriting
        return { id: doc.id, ...rest };  // Use doc.id as the unique identifier
    });
};


// Create a new fashion item in Firestore
export const createFashionItem = async (fashionItem: FashionItem): Promise<FashionItem> => {
    const { id, ...rest } = fashionItem;
    const docId = await createDocument<FashionItem>(COLLECTION, rest, id?.toString());
    const fashionItemData = { id: docId, ...rest };
    await updateDocument<FashionItem>(COLLECTION, docId, fashionItemData);
    return { id: docId, ...rest };
};

// Get a fashion item by its ID from Firestore
export const getFashionItemById = async (id: string): Promise<FashionItem | null> => {
    const doc = await getDocumentById<FashionItem>(COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as FashionItem;
};

// Update a fashion item in Firestore
export const updateFashionItem = async (id: string, fashionItem: Partial<FashionItem>): Promise<FashionItem> => {
    try {
        await updateDocument<FashionItem>(COLLECTION, id.toString(), fashionItem);
        const updatedFashionItem = await getFashionItemById(id);
        if (!updatedFashionItem) {
            throw new NotFoundError(`Fashion item with id ${id} not found`);
        }
        return updatedFashionItem;
    } catch (error) {
        console.error(`Failed to update fashion item:`, error);
        if (error instanceof NotFoundError) {
            throw error; 
        }
        throw new ServiceError(`${(error as Error).message}`);    
    }
};

// Delete a fashion item from Firestore
export const deleteFashionItem = async (id: string): Promise<FashionItem | null> => {
    try {
        const stringId = id.toString();
        const docRef = db.collection(COLLECTION).doc(stringId);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            return null; // Return null if the fashion item doesn't exist
        }

        const deletedFashionItem = docSnapshot.data() as FashionItem;
        await docRef.delete();
        return deletedFashionItem; // Return the deleted fashion item object
    } catch (error) {
        console.error(`Error deleting fashion item with ID ${id}:`, error);
        return null; // Return null in case of any errors
    }
};
