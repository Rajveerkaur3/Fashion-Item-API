import { db } from "../../../../config/firebaseConfig";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { QuerySnapshot, DocumentSnapshot } from "firebase-admin/firestore";
import { FashionItem } from '../models/FashionItemModel';

type FirestoreDataTypes =
	| string
	| number
	| boolean
	| null
	| Timestamp
	| FieldValue;

interface FieldValuePair {
	fieldName: string;
	fieldValue: FirestoreDataTypes;
}

export const runTransaction = async <T>(
    operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
    try {
        return await db.runTransaction(operations);
    } catch (error) {
        const err = error as Error; 
        console.error(`Transaction failed: ${err.message}`);
        throw new Error("Transaction failed: " + err.message);
    }
};

export const createDocument = async <T>(
    collectionName: string,
    data: Partial<T>
): Promise<string> => {
    try {
        const docRef = await db.collection(collectionName).add(data);
        return docRef.id;
    } catch (error) {
        const err = error as Error; 
        console.error(`Failed to create document: ${err.message}`);
        throw new Error("Failed to create document: " + err.message);
    }
};

export const getDocuments = async (
    collectionName: string
  ): Promise<QuerySnapshot<FashionItem>> => {
    try {
      const snapshot = await db.collection(collectionName).get();
      return snapshot as QuerySnapshot<FashionItem>; // Typecast here
    } catch (error) {
      console.error(`Failed to fetch documents: ${error}`);
      throw new Error("Failed to fetch documents");
    }
  };

  export const getDocumentById = async (
    collectionName: string,
    id: string
): Promise<DocumentSnapshot | null> => {
    try {
        console.log(`Fetching document with ID: ${id}`);
        const doc = await db.collection(collectionName).doc(id).get();
        if (!doc.exists) {
            console.log(`Document with ID ${id} not found`);
            return null;
        }
        console.log(`Document found: ${JSON.stringify(doc.data())}`);
        return doc; 
    } catch (error) {
        const err = error as Error;
        console.error(`Failed to fetch document: ${err.message}`);
        throw new Error("Failed to fetch document: " + err.message);
    }
};
  



export const updateDocument = async <T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).update(data);
    } catch (error) {
        const err = error as Error; 
        console.error(`Failed to update document: ${err.message}`);
        throw new Error("Failed to update document: " + err.message);
    }
};

export const deleteDocument = async (
    collectionName: string,
    id: string,
    transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
    try {
        const docRef = db.collection(collectionName).doc(id);
        if (transaction) {
            transaction.delete(docRef);
        } else {
            await docRef.delete();
        }
    } catch (error) {
        const err = error as Error; 
        console.error(`Failed to delete document: ${err.message}`);
        throw new Error("Failed to delete document: " + err.message);
    }
};

export const deleteDocumentsByFieldValues = async (
    collectionName: string,
    fieldValuePairs: FieldValuePair[],
    transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
    try {
        let query = db.collection(collectionName) as FirebaseFirestore.Query;

        // Apply field-value filters
        fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
            query = query.where(fieldName, "==", fieldValue);
        });

        const snapshot = transaction ? await transaction.get(query) : await query.get();

        if (transaction) {
            snapshot.docs.forEach((doc) => transaction.delete(doc.ref));
        } else {
            const batch = db.batch();
            snapshot.docs.forEach((doc) => batch.delete(doc.ref));
            await batch.commit();
        }
    } catch (error) {
        const err = error as Error; 
        console.error(`Failed to delete documents: ${err.message}`);
        throw new Error("Failed to delete documents: " + err.message);
    }
};
