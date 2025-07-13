import type { YouTubeVideo } from '../type'

interface ListVideoProps {
  listVideos: YouTubeVideo[]
}

const ListVideo = ({ listVideos }: ListVideoProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {listVideos.map((video) => (
        <div
          key={video.videoId}
          className="bg-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
        >
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative w-full aspect-video">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <h2 className="text-sm font-semibold text-white line-clamp-2">
                {video.title}
              </h2>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
  
}

export default ListVideo
