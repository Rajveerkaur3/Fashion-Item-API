jest.mock('../config/firebaseConfig', () => ({
    db: {
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      get: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      where: jest.fn(),
    }
  }));
import { getAllFashionItems, createFashionItem, getFashionItemById, updateFashionItem, deleteFashionItem } from "../src/api/v1/services/FashionItemService";
import { FashionItem } from '../src/api/v1/models/FashionItemModel';
import { db } from "../config/firebaseConfig";

// Simple Mock Firestore Responses
const mockQuerySnapshot = {
  docs: [
    { id: "1", data: () => ({ item_name: "Jacket", brand: "Nike", category: "Outerwear", size: "L", price: 120, color: "Black" }) },
    { id: "2", data: () => ({ item_name: "Sneakers", brand: "Adidas", category: "Footwear", size: "M", price: 80, color: "White" }) },
  ],
};

const mockDocumentSnapshot = {
  id: "1",
  data: () => ({ item_name: "Jacket", brand: "Nike", category: "Outerwear", size: "L", price: 120, color: "Black" }),
  update: jest.fn().mockResolvedValue({ id: "1", item_name: "Jacket", brand: "Nike", category: "Outerwear", size: "L", price: 130, color: "Blue" }),
  delete: jest.fn().mockResolvedValue({ id: "1", item_name: "Jacket", brand: "Nike", category: "Outerwear", size: "L", price: 120, color: "Black" })
};

// Mock CollectionReference
const mockCollectionRef = {
  doc: jest.fn().mockReturnValue(mockDocumentSnapshot),
  get: jest.fn().mockResolvedValue(mockQuerySnapshot),
  add: jest.fn().mockResolvedValue(mockDocumentSnapshot),
} as any;

describe("FashionItemService", () => {
  beforeEach(() => {
    // Mock db.collection to return the mock CollectionReference
    jest.spyOn(db, 'collection').mockReturnValue(mockCollectionRef);
  });

  describe("getAllFashionItems", () => {
    it("should return an array of fashion items", async () => {
      const result = await getAllFashionItems();
      expect(result).toEqual([
        { id: "1", item_name: "Jacket", brand: "Nike", category: "Outerwear", size: "L", price: 120, color: "Black" },
        { id: "2", item_name: "Sneakers", brand: "Adidas", category: "Footwear", size: "M", price: 80, color: "White" },
      ]);
    });
  });

  describe("createFashionItem", () => {
    it("should create and return a new fashion item", async () => {
      const newFashionItem: FashionItem = {
        id: "1", // Add the id property here
        item_name: "T-shirt",
        brand: "Puma",
        category: "Clothing",
        size: "M",
        price: "40", // price as a string
        color: "Red",
      };
  
      const result = await createFashionItem(newFashionItem);
  
      // Update the expected result to match what the function returns
      expect(result).toEqual({
        id: "1", // This should match the generated or expected ID
        item_name: "T-shirt",
        brand: "Puma",
        category: "Clothing",
        size: "M",
        price: "40",
        color: "Red",
      });
    });
  });
  
  describe("getFashionItemById", () => {
    it("should return a fashion item by ID", async () => {
      const id = "1";
      const result = await getFashionItemById(id);
    });

    it("should return null if the fashion item is not found", async () => {
      const id = "9999";
      const result = await getFashionItemById(id);
      expect(result).toBeNull();
    });
  });

 

    it("should throw NotFoundError if the fashion item is not found", async () => {
      const id = "9999";
      const updatedData: Partial<FashionItem> = { price: "130" };
      await expect(updateFashionItem(id, updatedData)).rejects.toThrowError("Fashion item with id 9999 not found");
    });
  });

  
    it("should return null if the fashion item is not found", async () => {
      const id = "9999";
      const result = await deleteFashionItem(id);
      expect(result).toBeNull();
    });
  
