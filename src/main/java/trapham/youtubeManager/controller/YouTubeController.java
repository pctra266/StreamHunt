package trapham.youtubeManager.controller;
import trapham.youtubeManager.model.YoutubeVideo;
import trapham.youtubeManager.service.YouTubeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/youtube")
public class YouTubeController {

    private final YouTubeService youTubeService;

    public YouTubeController(YouTubeService youTubeService) {
        this.youTubeService = youTubeService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getApiKey")
    public String getApiKey() {
        return youTubeService.getApiKey();
    }

}
