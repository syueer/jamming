import React from 'react';
import { Loading } from '../Loading/Loading';
import './Track.css';

interface Props {
  track: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  };
  onAdd?: (arg: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }) => void;
  isRemoval?: boolean;
  onRemove?: (arg: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }) => void;
  loading?: boolean;
}

export const Track: React.FC<Props> = ({
  track,
  onAdd,
  isRemoval,
  onRemove,
  loading,
}) => {
  // console.log(track);
  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={addTrack}>
          +
        </button>
      );
    }
  };
  const addTrack = () => {
    onAdd && onAdd(track);
  };
  const removeTrack = () => {
    onRemove && onRemove(track);
  };

  const play = () => {
    let playPreview = new Audio(track.preview);
    playPreview.play();
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}|<button onClick={play}>play</button>|{' '}
          <audio controls src={track.preview}></audio>
        </p>
      </div>
      {renderAction()}
    </div>
  );
};
