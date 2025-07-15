import { useState } from "react";
import type { YouTubeVideo } from "../type";
import SearchBox from "../components/SearchBox";
import ListVideo from "../components/ListVideo";
import { searchVideos } from "../service/axios";

const HomePage = () => {
  const [listVideos, setListVideos] = useState<YouTubeVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [prevPageToken, setPrevPageToken] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>("");

  const searchVideo = async (topic: string, pageToken: string = "") => {
    setCurrentTopic(topic); 
    const res = await searchVideos(topic, pageToken);

    if (!res || !Array.isArray(res.items)) {
      console.error("Invalid response from API:", res);
      return;
    }

    const videos: YouTubeVideo[] = res.items.map((item: any) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnailUrl: item.snippet.thumbnails.high.url,
    }));

    setListVideos(videos);
    setNextPageToken(res.nextPageToken);
    setPrevPageToken(res.prevPageToken);
  };

  const handleNextPage = () => {
    if (nextPageToken) {
      searchVideo(currentTopic, nextPageToken);
    }
  };

  const handlePrevPage = () => {
    if (prevPageToken) {
      searchVideo(currentTopic, prevPageToken);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SearchBox searchVideo={searchVideo} />
      <ListVideo listVideos={listVideos} />
        {prevPageToken && (
          <button
            onClick={handlePrevPage}
            className="bg-black text-white hover:bg-neutral-700  cursor-pointer px-4 py-2 rounded "
          >
            Previous
          </button>
        )}
        {nextPageToken && (
          <button
            onClick={handleNextPage}
            className="bg-black text-white hover:bg-neutral-700  cursor-pointer px-4 py-2 rounded "
          >
            Next
          </button>
        )}
    </div>
  );
};

export default HomePage;
