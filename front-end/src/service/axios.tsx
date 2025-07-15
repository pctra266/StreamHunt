import axios from 'axios';


export const searchVideos = async (topic: string, pageToken: string = "") => {
    const apiKey = await getApiKey();
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
    const url = buildYouTubeUrl(apiKey, topic, BASE_URL, pageToken);
  
    try {
      const res = await axios.get(url);
      return {
        items: res.data.items,
        nextPageToken: res.data.nextPageToken || null,
        prevPageToken: res.data.prevPageToken || null,
      };
    } catch (err) {
      console.error("Search failed:", err);
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
function buildYouTubeUrl(apiKey: string, topic: string, BASE_URL: string, pageToken = ""): string {
    const url = new URL(BASE_URL);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", topic);
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "50");  
    url.searchParams.set("key", apiKey);
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    return url.toString();
  }
  
  
