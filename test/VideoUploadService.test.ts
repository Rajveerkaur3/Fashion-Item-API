// __tests__/VideoUploadService.test.ts
import { uploadVideo, deleteVideo } from "../src/api/v1/services/VideoUploadService";
import { VideoUpload } from "../src/api/v1/models/VideoUploadModel";
import { ServiceError } from "../src/api/v1/models/customError";
import { db } from "../config/firebaseConfig";

// Mock Firestore config
jest.mock("../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    where: jest.fn(),
  },
}));

// Firestore mock data
const mockQuerySnapshot = {
  docs: [
    {
      id: "1",
      data: () => ({
        username: "john_doe",
        itemId: "123",
        uploadDate: "2023-01-01",
        feedback: "Great video!",
      }),
    },
  ],
};

const mockDocumentSnapshot = {
  id: "1",
  data: () => ({
    username: "john_doe",
    itemId: "123",
    uploadDate: "2023-01-01",
    feedback: "Great video!",
  }),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
};

describe("VideoUploadService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe("deleteVideo", () => {
    it("should return false if video does not exist", async () => {
      const mockDoc = {
        get: jest.fn().mockResolvedValue({ exists: false }),
      };

      (db.collection as jest.Mock).mockReturnValue({
        doc: jest.fn(() => mockDoc),
      });

      const result = await deleteVideo("9999");
      expect(result).toBe(false);
    });

    it("should delete a video successfully", async () => {
      const mockDoc = {
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            username: "john_doe",
            itemId: "123",
            uploadDate: "2023-01-01",
            feedback: "Great video!",
          }),
        }),
        delete: jest.fn().mockResolvedValue(undefined),
      };

      (db.collection as jest.Mock).mockReturnValue({
        doc: jest.fn(() => mockDoc),
      });

      const result = await deleteVideo("1");

      expect(result).toBe(true);
      expect(mockDoc.delete).toHaveBeenCalled();
    });
  });
});
