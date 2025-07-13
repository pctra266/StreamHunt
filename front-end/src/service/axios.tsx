import axios from 'axios';


export const searchVideos = async (topic:string) => {
    const apiKey = await getApiKey();
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
    const Url = buildYouTubeUrl(apiKey,topic, BASE_URL)
    try {
      const res = await axios.get(`${Url}`);
      return res.data.items;
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

export const getApiKey = async()=>{
    try{
        const res = await axios.get('http://localhost:8080/api/youtube/getApiKey')
        return res.data;
    }catch (err) {
        console.error('get failed:', err);
      }
}
function buildYouTubeUrl(apiKey: string, topic: string, BASE_URL:string): string {
    const url = new URL(BASE_URL);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", topic);
    url.searchParams.set("type", "video");
    url.searchParams.set("videoDuration", "medium");
    url.searchParams.set("maxResults", "1000");
    url.searchParams.set("order", "rating");
    url.searchParams.set("key", apiKey);
    return url.toString();
  }
  
