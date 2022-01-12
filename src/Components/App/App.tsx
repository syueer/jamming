import React, { useState, useEffect } from 'react';
import { PlayList } from '../PlayList/PlayList';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
// import { TrackList } from '../TrackList/TrackList';
import './App.css';
import Spotify from '../../util/Spotify';

function App() {
  const [results, setResults] = useState<
    {
      id: any;
      name: string;
      artist: any;
      album: any;
      uri: string;
      preview: string;
    }[]
  >([]);
  const [playlistName, setPlaylistName] = useState('my playList');
  const [playlistTracks, setplaylistTracks] = useState<
    {
      id: any;
      name: string;
      artist: any;
      album: any;
      uri: string;
      preview: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const addTrack = (track: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }) => {
    let tracks = playlistTracks;
    if (
      tracks.find(
        (savedTrack: {
          id: any;
          name: string;
          artist: any;
          album: any;
          uri: string;
          preview: string;
        }) => savedTrack.id === track.id
      )
    ) {
      return;
    }
    setplaylistTracks([...tracks, track]);
  };

  const removeTrack = (track: {
    name: string;
    artist: string;
    album: string;
    id: number;
    uri: string;
    preview: string;
  }) => {
    let tracks = playlistTracks;
    tracks = tracks.filter((selectTrack) => selectTrack.id !== track.id);
    setplaylistTracks(tracks);
  };

  const updatePlaylistName = (name: string) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    let trackURIs: string[] = playlistTracks.map((track) => track.uri);

    // Spotify.savePlaylist(playlistName, trackURIs);
    setLoading(true);
    Spotify.savePlaylist(playlistName, trackURIs)?.then(() => {
      setLoading(false);
      setPlaylistName('New Playlist');
      setplaylistTracks([]);
    });
  };

  const search = (term: string) => {
    Spotify.search(term).then(
      (
        results: {
          id: any;
          name: string;
          artist: any;
          album: any;
          uri: string;
          preview: string;
        }[]
      ) => {
        const currentResults = results.filter(
          (result) => !playlistTracks.find(({ id }) => result.id === id)
        );
        console.log(currentResults);
        setResults(currentResults);
      }
    );
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={results} onAdd={addTrack} />
          <PlayList
            playlistName={playlistName}
            playTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
