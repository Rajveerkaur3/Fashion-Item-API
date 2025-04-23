import { VideoUpload } from "../models/VideoUploadModel";
import { db } from "../../../../config/firebaseConfig";
import { createDocument } from "../repositories/firestoreRepository";
import { ServiceError } from "../models/customError";

// Define the collection name for videos
const COLLECTION = "videos";

// Upload a new video
export const uploadVideo = async (videoDetails: VideoUpload): Promise<VideoUpload> => {
  try {
    const { username, itemId, uploadDate, file, feedback } = videoDetails;

    // Ensure a file is present
    if (!file) {
      throw new ServiceError("File is required for video upload");
    }

    // Create a new video object with the provided details
    const newVideo = {
      username,
      itemId,
      uploadDate,
      fileUrl: file.path,  // Assuming 'file.path' stores the path of the uploaded file
      file,                // Store the file object for potential future use
      feedback             // Include feedback if provided
    };

    // Save the video document to Firestore
    const docId = await createDocument<VideoUpload>(COLLECTION, newVideo);

    // Return the newly uploaded video, including its generated ID
    const uploadedVideo = { ...newVideo, id: docId };
    return uploadedVideo;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new ServiceError(`Error uploading video: ${(error as Error).message}`);
  }
};

// Delete a video by ID
export const deleteVideo = async (id: string): Promise<boolean> => {
  try {
    const docRef = db.collection(COLLECTION).doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return false;  // Video not found
    }

    // Delete the video document from Firestore
    await docRef.delete();
    return true;  // Return true if deletion is successful
  } catch (error) {
    console.error(`Error deleting video with ID ${id}:`, error);
    throw new ServiceError(`Error deleting video: ${(error as Error).message}`);
  }
};

// Get videos by itemId
export const getVideosByItemId = async (itemId: string): Promise<VideoUpload[]> => {
  try {
    const querySnapshot = await db
      .collection(COLLECTION)
      .where("itemId", "==", itemId)
      .get();

    // If no videos found, return an empty array
    if (querySnapshot.empty) {
      return [];
    }

    // Map through the Firestore query results to construct VideoUpload objects
    const videos: VideoUpload[] = querySnapshot.docs.map(doc => {
      const videoData = doc.data();

      // Return a VideoUpload object including all relevant data, such as file URL and feedback
      return {
        id: doc.id,             // Add document ID as 'id'
        username: videoData.username,
        itemId: videoData.itemId,
        uploadDate: videoData.uploadDate,
        fileUrl: videoData.fileUrl,  // Include the URL to the uploaded video
        file: videoData.file,        // Assuming 'file' stores the file object or relevant data
        feedback: videoData.feedback // Include feedback
      };
    });

    return videos; // Return the list of videos
  } catch (error) {
    console.error(`Error fetching videos for itemId ${itemId}:`, error);
    throw new ServiceError(`Error fetching videos: ${(error as Error).message}`);
  }
};
