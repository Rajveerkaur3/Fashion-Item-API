import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

const VideoUpload = () => {
  const [feedback, setFeedback] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const handleEmojiClick = (emojiData) => {
    setFeedback(feedback + emojiData.emoji); // append emoji
  };

  const handleVideoUpload = async () => {
    const formData = new FormData();
    formData.append('username', 'john_doe');  // Adjust as per your logic
    formData.append('itemId', '123');  // Adjust as per your logic
    formData.append('uploadDate', new Date().toISOString());
    formData.append('feedback', feedback);
    formData.append('file', videoFile);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Video uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
      />
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Type feedback or add emoji..."
      />
      <button onClick={() => setShowPicker(!showPicker)}>😊</button>
      {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      <button onClick={handleVideoUpload}>Upload Video</button>
    </div>
  );
};

export default VideoUpload;
