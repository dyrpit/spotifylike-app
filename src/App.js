import React, { useEffect } from 'react';

import { useGetMusicData } from './hooks/useGetMusicData';

import Error from './components/Error/Error';
import Header from './components/Header/Header';
import Pending from './components/Pending/Pending';
import Player from './components/Player/Player';

import './App.css';

const App = () => {
  //add responsivnes
  const { data, errorMessage, isPending, fetchData } = useGetMusicData();

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='container'>
      <Header />
      <Pending isPending={isPending} message={errorMessage} />
      <Error handleRefresh={handleRefresh} message={errorMessage} />
      {data && <Player songs={data} />}
    </div>
  );
};

export default App;
