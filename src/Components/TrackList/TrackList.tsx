import React from 'react';
import { Loading } from '../Loading/Loading';
import { Track } from '../Track/Track';
import './TrackList.css';

interface Props {
  tracks: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }[];
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

export const TrackList: React.FC<Props> = ({
  tracks,
  onAdd,
  isRemoval,
  onRemove,
  loading,
}) => {
  // console.log(tracks)
  return (
    <div className="TrackList">
      {loading ? (
        <Loading />
      ) : (
        tracks.map((track) => {
          return (
            <Track
              track={track}
              key={track.id}
              onAdd={onAdd}
              isRemoval={isRemoval}
              onRemove={onRemove}
              loading={loading}
            />
          );
        })
      )}
    </div>
  );
};
