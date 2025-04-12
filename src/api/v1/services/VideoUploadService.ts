import { VideoUpload } from "../models/VideoUploadModel";  // Updated import for VideoUpload interface
import { db } from "../../../../config/firebaseConfig";  // Your Firebase config
import { createDocument } from "../repositories/firestoreRepository";  
import { ServiceError } from "../models/customError";

// Define the collection name for videos
const COLLECTION = "videos";

// Upload a new video
export const uploadVideo = async (videoDetails: VideoUpload): Promise<VideoUpload> => {
  try {
    const { username, itemId, uploadDate, file, feedback } = videoDetails;  // Added feedback

    if (!file) {
      throw new ServiceError("File is required for video upload");
    }

    // Prepare the video data to upload
    const newVideo = {
      username,
      itemId,
      uploadDate,
      fileUrl: file.path,  // Assuming the file path is stored in 'file.path'
      file,                // Ensure file is included
      feedback             // Include feedback
    };

    const docId = await createDocument<VideoUpload>(COLLECTION, newVideo);  // Upload the video document
    const uploadedVideo = { id: docId, ...newVideo };  // Attach the generated ID to the video data

    return uploadedVideo;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw new ServiceError(`Error uploading video: ${(error as Error).message}`);
  }
};

// Delete a video by ID
export const deleteVideo = async (id: string): Promise<boolean> => {
  try {
    const docRef = db.collection(COLLECTION).doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return false;  // Return false if the video doesn't exist
    }

    // Delete the video document
    await docRef.delete();
    return true;  // Return true if video is successfully deleted
  } catch (error) {
    console.error(`Error deleting video with ID ${id}:`, error);
    throw new ServiceError(`Error deleting video: ${(error as Error).message}`);
  }
};
