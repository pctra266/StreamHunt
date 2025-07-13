package trapham.youtubeManager.service;

import trapham.youtubeManager.model.YoutubeVideo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class YouTubeService {
    @Value("${youtube.api.key}")
    private String apiKey;
    public  String getApiKey(){
        return apiKey;
    }
}
