import React from 'react';
import { TrackList } from '../TrackList/TrackList';
import './PlayList.css';

interface Props {
  playlistName: string;

  playTracks: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }[];
  onRemove: (arg: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }) => void;
  onNameChange: (arg: string) => void;
  onSave: () => void;
  loading?: boolean;
}

export const PlayList: React.FC<Props> = ({
  playlistName,
  playTracks,
  onRemove,
  onNameChange,
  onSave,
  loading,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };
  return (
    <div className="Playlist">
      <input defaultValue={'New Playlist'} onChange={handleNameChange} />
      <TrackList
        tracks={playTracks}
        onRemove={onRemove}
        isRemoval={true}
        loading={loading}
      />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};
