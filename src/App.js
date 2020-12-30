import React, { useEffect } from 'react';

import { useGetMusicData } from './hooks/useGetMusicData';

import Header from './components/Header/Header';
import Player from './components/Player/Player';

import './App.css';

const App = () => {
  //make error compoennt
  //make loading component
  //add proptypes
  //add responsivnes
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
          <Player songs={data} />
        </>
      )}
    </div>
  );
};

export default App;
