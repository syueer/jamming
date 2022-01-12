import React from 'react';
import { TrackList } from '../TrackList/TrackList';
import './SearchResults.css';

interface Props {
  searchResults: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }[];
  onAdd: (arg: {
    id: any;
    name: string;
    artist: any;
    album: any;
    uri: string;
    preview: string;
  }) => void;
}

export const SearchResults: React.FC<Props> = ({ searchResults, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      {/* <!-- Add a /9/rackList component --> */}
    </div>
  );
};
