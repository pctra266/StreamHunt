import React, { useEffect, useState } from 'react';
import {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from '../service/YoutubeService';

type Playlist = {
  id: string;
  snippet: {
    title: string;
    description: string;
  };
};

const PlaylistManager: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadPlaylists = async () => {
    try {
      const res = await getPlaylists();
      setPlaylists(res.data.items);
    } catch (err) {
      console.error('Error loading playlists:', err);
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    await createPlaylist(newTitle, newDescription);
    setNewTitle('');
    setNewDescription('');
    loadPlaylists();
  };

  const handleUpdate = async (id: string, title: string, description: string) => {
    await updatePlaylist(id, title, description);
    setEditingId(null);
    loadPlaylists();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this playlist?')) {
      await deletePlaylist(id);
      loadPlaylists();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎵 My YouTube Playlists</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-1/3 rounded"
          placeholder="New playlist title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          className="border p-2 w-1/3 rounded"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>

      {playlists.map((pl) => (
        <div key={pl.id} className="border p-4 mb-3 rounded bg-white shadow">
          {editingId === pl.id ? (
            <div>
              <input
                className="border p-2 w-full mb-2 rounded"
                defaultValue={pl.snippet.title}
                onBlur={(e) => updatePlaylist(pl.id, e.target.value, pl.snippet.description)}
              />
              <button
                className="text-sm text-red-500"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{pl.snippet.title}</h2>
              <p className="text-gray-600">{pl.snippet.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setEditingId(pl.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(pl.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlaylistManager;
