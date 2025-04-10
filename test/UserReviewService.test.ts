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
    getAllUserReviews,
    createUserReview,
    getUserReviewById,
    updateUserReview,
    deleteUserReview
  } from "../src/api/v1/services/UserReviewService";
  import { db } from "../config/firebaseConfig";
  import { UserReview } from "../src/api/v1/models/UserReviewModel";
  
  // Mock Firestore responses
  const mockQuerySnapshot = {
    docs: [
      {
        id: "101",
        data: () => ({
          fashionItemId: "F001",
          userName: "Alice",
          comment: "Love this!",
          rating: "5",
          createdAt: "2024-03-01T12:00:00Z"
        }),
      },
      {
        id: "102",
        data: () => ({
          fashionItemId: "F002",
          userName: "Bob",
          comment: "Nice quality",
          rating: "4",
          createdAt: "2024-03-02T10:00:00Z"
        }),
      }
    ]
  };
  
  const mockDocumentSnapshot = {
    id: "101",
    exists: true,
    data: () => ({
      fashionItemId: "F001",
      userName: "Alice",
      comment: "Love this!",
      rating: "5",
      createdAt: "2024-03-01T12:00:00Z"
    })
  };
  
  // Collection mock
  const mockCollectionRef = {
    doc: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockDocumentSnapshot),
      delete: jest.fn().mockResolvedValue(undefined),
    }),
    get: jest.fn().mockResolvedValue(mockQuerySnapshot),
    add: jest.fn().mockResolvedValue({ id: "103" }),
  } as any;
  
  describe("UserReviewService", () => {
    beforeEach(() => {
      jest.spyOn(db, "collection").mockReturnValue(mockCollectionRef);
    });
  
    describe("getAllUserReviews", () => {
      it("should return an array of user reviews", async () => {
        const result = await getAllUserReviews();
        expect(result).toEqual([
          {
            id: "101",
            fashionItemId: "F001",
            userName: "Alice",
            comment: "Love this!",
            rating: "5",
            createdAt: "2024-03-01T12:00:00Z"
          },
          {
            id: "102",
            fashionItemId: "F002",
            userName: "Bob",
            comment: "Nice quality",
            rating: "4",
            createdAt: "2024-03-02T10:00:00Z"
          }
        ]);
      });
    });
  
    describe("createUserReview", () => {
        it("should create and return a new user review", async () => {
          const mockDocId = "mocked-review-id";
          const mockAdd = jest.fn().mockResolvedValue({ id: mockDocId });
          const mockUpdate = jest.fn().mockResolvedValue(undefined); // update returns void
      
          const mockDoc = jest.fn().mockReturnValue({
            update: mockUpdate,
          });
      
          const mockCollection = {
            add: mockAdd,
            doc: mockDoc,
          };
      
          jest.spyOn(db, "collection").mockImplementation((path: string) => {
            if (path === "userReviews") {
              return mockCollection as any;
            }
            return {} as any;
          });
      
          const newReview: UserReview = {
            fashionItemId: "f001",
            userName: "Rajveer",
            comment: "Amazing style!",
            rating: "5",
            createdAt: new Date().toISOString(),
            id: "",
          };
      
          const result = await createUserReview(newReview);
      
          expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({
            fashionItemId: "f001",
            userName: "Rajveer",
            comment: "Amazing style!",
            rating: "5"
          }));
      
          expect(mockDoc).toHaveBeenCalledWith(mockDocId);
          expect(mockUpdate).toHaveBeenCalledWith({
            ...newReview,
            id: mockDocId
          });
      
          expect(result).toMatchObject({
            ...newReview,
            id: mockDocId
          });
        });
      });
      
    describe("getUserReviewById", () => {
      it("should return a review by ID", async () => {
        const result = await getUserReviewById("101");
        expect(result).toEqual({
          id: "101",
          fashionItemId: "F001",
          userName: "Alice",
          comment: "Love this!",
          rating: "5",
          createdAt: "2024-03-01T12:00:00Z"
        });
      });
  
      it("should return null if review is not found", async () => {
        mockCollectionRef.doc.mockReturnValueOnce({
          get: jest.fn().mockResolvedValue({ exists: false })
        });
  
        const result = await getUserReviewById("999");
        expect(result).toBeNull();
      });
    });
  
    describe("updateUserReview", () => {
      beforeEach(() => {
        const updatedSnapshot = {
          id: "101",
          exists: true,
          data: () => ({
            fashionItemId: "F001",
            userName: "Alice",
            comment: "Updated comment",
            rating: "4",
            createdAt: "2024-03-01T12:00:00Z"
          })
        };
  
        (db.collection as jest.Mock).mockReturnValue({
          doc: jest.fn(() => ({
            update: jest.fn().mockResolvedValue(undefined),
            get: jest.fn().mockResolvedValue(updatedSnapshot),
          })),
        });
      });
  
      it("should update and return the updated user review", async () => {
        const updatedData: Partial<UserReview> = {
          comment: "Updated comment",
          rating: "4"
        };
  
        const result = await updateUserReview("101", updatedData);
        expect(result).toEqual({
          id: "101",
          fashionItemId: "F001",
          userName: "Alice",
          comment: "Updated comment",
          rating: "4",
          createdAt: "2024-03-01T12:00:00Z"
        });
      });
    });
  
    describe("deleteUserReview", () => {
      it("should delete a user review and return the deleted data", async () => {
        const result = await deleteUserReview("101");
        expect(result).toEqual({
          fashionItemId: "F001",
          userName: "Alice",
          comment: "Love this!",
          rating: "5",
          createdAt: "2024-03-01T12:00:00Z"
        });
      });
  
      it("should return null if the review to delete doesn't exist", async () => {
        const mockDoc = {
          get: jest.fn().mockResolvedValue({ exists: false }),
        };
      
        const mockCollection = {
          doc: jest.fn().mockReturnValue(mockDoc),
        };
      
        jest.spyOn(db, "collection").mockImplementation((path: string) => {
          if (path === "userReviews") {
            return mockCollection as any;
          }
          throw new Error(`Unknown collection path: ${path}`);
        });
      
        const result = await deleteUserReview("999");
        expect(result).toBeNull();
      });
      
    });
  });
  