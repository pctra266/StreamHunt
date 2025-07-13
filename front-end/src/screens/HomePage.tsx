import { useState } from 'react';
import type { YouTubeVideo } from '../type';
import SearchBox from '../components/SearchBox';
import ListVideo from '../components/ListVideo';
import {searchVideos} from '../service/axios'

const HomePage = () => {
    const [listVideos, setlistVideos] = useState<YouTubeVideo[]>([]);
    const searchVideo = async (topic:string) => {
        const res = await searchVideos(topic); 
      
        if (!res || !Array.isArray(res)) {
          console.error('Invalid response from API:', res);
          return;
        }
      
        const videos: YouTubeVideo[] = res.map((item: any) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          thumbnailUrl: item.snippet.thumbnails.high.url,
        }));
      
        setlistVideos(videos);
      };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
    <SearchBox searchVideo={searchVideo}></SearchBox>
    <ListVideo listVideos={listVideos}></ListVideo>
    </div>
  )
}

export default HomePage