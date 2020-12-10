import React, { useEffect } from 'react';

import { useGetMusicData } from './services/useGetMusicData';

import Header from './components/Header/Header';
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
    <div className='container'>
      <Header />

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
