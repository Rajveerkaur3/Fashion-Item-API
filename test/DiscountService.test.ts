import { getAllDiscounts, createDiscount, getDiscountById, updateDiscount, deleteDiscount } from "../src/api/v1/services/DiscountService";
import { Discount } from '../src/api/v1/models/DiscountModel';
import { db } from "../config/firebaseConfig";

// Simple Mock Firestore Responses
const mockQuerySnapshot = {
  docs: [
    { id: "1", data: () => ({ percentage: "20%", description: "Winter Sale", startDate: "2025-01-01", endDate: "2025-02-01" }) },
    { id: "2", data: () => ({ percentage: "15%", description: "Spring Discount", startDate: "2025-03-01", endDate: "2025-04-01" }) },
  ],
};

const mockDocumentSnapshot = {
  id: "1",
  data: () => ({ percentage: "20%", description: "Winter Sale", startDate: "2025-01-01", endDate: "2025-02-01" }),
  update: jest.fn().mockResolvedValue({
    id: "1",
    percentage: "25%",
    description: "Updated Winter Sale",
    startDate: "2025-01-01",
    endDate: "2025-02-28",
  }),
  delete: jest.fn().mockResolvedValue({
    id: "1",
    percentage: "20%",
    description: "Winter Sale",
    startDate: "2025-01-01",
    endDate: "2025-02-01",
  }),
};

// Mock CollectionReference
const mockCollectionRef = {
  doc: jest.fn().mockReturnValue(mockDocumentSnapshot),
  get: jest.fn().mockResolvedValue(mockQuerySnapshot),
  add: jest.fn().mockResolvedValue(mockDocumentSnapshot),
} as any;

describe("DiscountService", () => {
  beforeEach(() => {
    // Mock db.collection to return the mock CollectionReference
    jest.spyOn(db, 'collection').mockReturnValue(mockCollectionRef);
  });

  describe("getAllDiscounts", () => {
    it("should return an array of discounts", async () => {
      const result = await getAllDiscounts();
      expect(result).toEqual([
        { id: "1", percentage: "20%", description: "Winter Sale", startDate: "2025-01-01", endDate: "2025-02-01" },
        { id: "2", percentage: "15%", description: "Spring Discount", startDate: "2025-03-01", endDate: "2025-04-01" },
      ]);
    });
  });

  describe("createDiscount", () => {
    it("should create and return a new discount", async () => {
      const newDiscount: Discount = {
        id: "3", // Make sure to use the expected ID
        percentage: "30%",
        description: "Summer Discount",
        startDate: "2025-06-01",
        endDate: "2025-07-01",
      };
  
      // Mock the add function to return the new discount with ID "3"
      mockCollectionRef.add.mockResolvedValue({
        id: "3", // Corrected ID
        percentage: "30%",
        description: "Summer Discount",
        startDate: "2025-06-01",
        endDate: "2025-07-01",
      });
  
      const result = await createDiscount(newDiscount);
  
      expect(result).toEqual({
        id: "3",
        percentage: "30%",
        description: "Summer Discount",
        startDate: "2025-06-01",
        endDate: "2025-07-01",
      });
    });
  });
  

  describe("getDiscountById", () => {
    it("should return a discount by ID", async () => {
      const id = "1";
      const result = await getDiscountById(id);
      ({
        id: "1",
        percentage: "20%",
        description: "Winter Sale",
        startDate: "2025-01-01",
        endDate: "2025-02-01",
      });
    });
  
    it("should return null if the discount is not found", async () => {
      const id = "9999"; // Non-existent ID
      const result = await getDiscountById(id);
      expect(result).toBeNull();
    });
  });
  
  describe("deleteDiscount", () => {
    it("should delete a discount and return the deleted discount", async () => {
      const id = "1";
  
      // Mock the Firestore response for deleting the discount
      mockCollectionRef.doc.mockReturnValue({
        delete: jest.fn().mockResolvedValue({}),
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            id: "1",
            percentage: "20%",
            description: "Winter Sale",
            startDate: "2025-01-01",
            endDate: "2025-02-01",
          }),
        }),
      });
  
      const result = await deleteDiscount(id);
  
      // Expect the result to be the deleted discount data
      expect(result).toEqual({
        id: "1",
        percentage: "20%",
        description: "Winter Sale",
        startDate: "2025-01-01",
        endDate: "2025-02-01",
      });
    });
  
    it("should return null if the discount does not exist", async () => {
      const id = "9999";
  
      // Mock the Firestore response for a non-existent discount
      mockCollectionRef.doc.mockReturnValue({
        get: jest.fn().mockResolvedValue({ exists: false }),
        delete: jest.fn(),
      });
  
      const result = await deleteDiscount(id);
  
      expect(result).toBeNull(); // Expect null if the discount doesn't exist
    });
  });
  
});
