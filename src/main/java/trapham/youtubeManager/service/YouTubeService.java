package trapham.youtubeManager.service;

import trapham.youtubeManager.model.YoutubeVideo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@Service
public class YouTubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    public List<YoutubeVideo> searchVideos(String query) {
        RestTemplate restTemplate = new RestTemplate();

        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("part", "snippet")
                .queryParam("q", query)
                .queryParam("type", "video")
                .queryParam("maxResults", "10")
                .queryParam("key", apiKey)
                .toUriString();

        Map response = restTemplate.getForObject(url, Map.class);
        List<YoutubeVideo> results = new ArrayList<>();

        List items = (List) response.get("items");

        for (Object item : items) {
            Map itemMap = (Map) item;
            Map id = (Map) itemMap.get("id");
            Map snippet = (Map) itemMap.get("snippet");

            String videoId = (String) id.get("videoId");
            String title = (String) snippet.get("title");
            Map thumbnails = (Map) snippet.get("thumbnails");
            Map defaultThumb = (Map) thumbnails.get("default");
            String thumbnailUrl = (String) defaultThumb.get("url");

            results.add(new YoutubeVideo(title, videoId, thumbnailUrl));
        }

        return results;
    }
}
