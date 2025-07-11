import { useState } from 'react';
import axios from 'axios';

type YouTubeVideo = {
  title: string;
  videoId: string;
  thumbnailUrl: string;
};

function App() {
  const [results, setResults] = useState<YouTubeVideo[]>([]);

  const searchVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/youtube/search`);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 YouTube Video Search</h1>

      <div className="flex gap-2 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={searchVideos}
        >
          getRandomVideo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((video) => (
          <div key={video.videoId} className="border p-2 rounded shadow">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full mb-2 rounded"
            />
            <h2 className="text-md font-semibold">{video.title}</h2>
            <a
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              className="text-blue-500 hover:underline text-sm"
            >
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
