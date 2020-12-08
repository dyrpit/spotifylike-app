import React, { useEffect } from 'react';

import { useGetMusicData } from './services/useGetMusicData';

import SongsList from './components/SongsList/SongsList';
import SongPlayer from './components/SongPlayer/SongPlayer';

import './App.css';

const App = () => {
  //make error compoennt
  //make loading component
  const { data, errorMessage, isPending, fetchData } = useGetMusicData();

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const errorElement = errorMessage ? (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <p>{errorMessage}</p>
    </div>
  ) : (
    <div>LOADING...</div>
  );

  return (
    <div>
      <header>
        <h1>Spotify-like App</h1>
      </header>

      {isPending ? (
        <>{errorElement}</>
      ) : (
        <>
          <SongPlayer songs={data} />
          <SongsList songs={data} />
        </>
      )}
    </div>
  );
};

export default App;
