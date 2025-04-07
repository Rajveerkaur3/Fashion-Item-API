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
import {
    getAllBrands,
    createBrand,
    getBrandById,
    updateBrand,
    deleteBrand,
  } from "../src/api/v1/services/BrandService";
  import { Brand } from "../src/api/v1/models/BrandModel";
  import { db } from "../config/firebaseConfig";
  
  // Mock Firestore Responses
  const mockQuerySnapshot = {
    docs: [
      {
        id: "1",
        data: () => ({
          name: "Nike",
          country: "USA",
          establishedYear: "1964",
          description: "Global sportswear brand",
        }),
      },
      {
        id: "2",
        data: () => ({
          name: "Adidas",
          country: "Germany",
          establishedYear: "1949",
          description: "Leading athletic brand",
        }),
      },
    ],
  };
  
  const mockDocumentSnapshot = {
    id: "1",
    data: () => ({
      name: "Nike",
      country: "USA",
      establishedYear: "1964",
      description: "Global sportswear brand",
    }),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  };
  
  // Mock CollectionReference
  const mockCollectionRef = {
    doc: jest.fn().mockReturnValue(mockDocumentSnapshot),
    get: jest.fn().mockResolvedValue(mockQuerySnapshot),
    add: jest.fn().mockResolvedValue({ id: "3" }),
  } as any;
  
  describe("BrandService", () => {
    beforeEach(() => {
      jest.spyOn(db, "collection").mockReturnValue(mockCollectionRef);
    });
  
    describe("getAllBrands", () => {
      it("should return an array of brands", async () => {
        const result = await getAllBrands();
        expect(result).toEqual([
          {
            id: "1",
            name: "Nike",
            country: "USA",
            establishedYear: "1964",
            description: "Global sportswear brand",
          },
          {
            id: "2",
            name: "Adidas",
            country: "Germany",
            establishedYear: "1949",
            description: "Leading athletic brand",
          },
        ]);
      });
    });
  
    describe("createBrand", () => {
      it("should create and return a new brand", async () => {
        const newBrand: Brand = {
          id: "3",
          name: "Puma",
          country: "Germany",
          establishedYear: "1948",
          description: "Sportswear and athletic brand",
        };
  
        const result = await createBrand(newBrand);
        expect(result).toEqual({
          id: "3",
          name: "Puma",
          country: "Germany",
          establishedYear: "1948",
          description: "Sportswear and athletic brand",
        });
      });
    });
  
    
      it("should return null if the brand is not found", async () => {
        mockCollectionRef.doc.mockReturnValueOnce({
          get: jest.fn().mockResolvedValue({ exists: false }),
        });
  
        const result = await getBrandById("9999");
        expect(result).toBeNull();
      });
    });
  
    describe("updateBrand", () => {
        beforeEach(() => {
          const mockDoc = {
            update: jest.fn().mockResolvedValue(undefined), // Simulate update success
            get: jest.fn().mockResolvedValue({
              exists: true,
              id: "1",
              data: () => ({
                name: "Nike",
                country: "USA",
                establishedYear: "1964",
                description: "Updated description", // This is the updated value
              }),
            }),
          };
      
          (db.collection as jest.Mock).mockReturnValue({
            doc: jest.fn(() => mockDoc),
          });
        });
      
        it("should update and return the updated brand", async () => {
          const updatedData: Partial<Brand> = {
            description: "Updated description",
          };
      
          const result = await updateBrand("1", updatedData);
      
          expect(result).toEqual({
            id: "1",
            name: "Nike",
            country: "USA",
            establishedYear: "1964",
            description: "Updated description", // This must match what's mocked
          });
        });
      });
  
      describe("deleteBrand", () => {
        beforeEach(() => {
          const mockDoc = {
            get: jest.fn().mockResolvedValue({
              exists: true,
              id: "1",
              data: () => ({
                name: "Nike",
                country: "USA",
                establishedYear: "1964",
                description: "Global sportswear brand",
              }),
            }),
            delete: jest.fn().mockResolvedValue(undefined), // Simulate deletion
          };
      
          (db.collection as jest.Mock).mockReturnValue({
            doc: jest.fn(() => mockDoc),
          });
        });
      
        it("should delete a brand and return the deleted brand", async () => {
          const result = await deleteBrand("1");
      
          expect(result).toEqual({
            name: "Nike",
            country: "USA",
            establishedYear: "1964",
            description: "Global sportswear brand",
          });
        });
      });
  