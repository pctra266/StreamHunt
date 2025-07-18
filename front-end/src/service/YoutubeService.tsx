// src/services/youtubeService.ts
import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return { Authorization: `Bearer ${token}` };
}

// 🟢 Get all playlists of the user
export const getPlaylists = async () => {
  return await axiosInstance.get('/playlists', {
    params: {
      part: 'snippet',
      mine: true,
      maxResults: 25,
    },
    headers: getAuthHeaders(),
  });
};

// 🟡 Create new playlist
export const createPlaylist = async (title: string, description: string = '') => {
  return axiosInstance.post('/playlists?part=snippet,status', {
    snippet: {
      title,
      description,
    },
    status: {
      privacyStatus: 'private',
    },
  }, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });
};

// 🔵 Update playlist title/description
export const updatePlaylist = async (id: string, title: string, description: string = '') => {
  return axiosInstance.put('/playlists?part=snippet', {
    id,
    snippet: {
      title,
      description,
    },
  }, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });
};

// 🔴 Delete playlist
export const deletePlaylist = async (id: string) => {
  return axiosInstance.delete(`/playlists`, {
    params: { id },
    headers: getAuthHeaders(),
  });
};
