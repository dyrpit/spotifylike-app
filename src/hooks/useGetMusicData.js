import { useCallback, useState } from 'react';

import { fetchMusicData } from '../services/fakeAPI';

export const useGetMusicData = () => {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = useCallback(async () => {
    setIsPending(true);
    setErrorMessage('');

    try {
      const responseData = await fetchMusicData();
      setData(responseData);
      setIsPending(false);
    } catch (e) {
      setErrorMessage(e);
    }
  }, []);

  return {
    data,
    errorMessage,
    isPending,
    fetchData,
  };
};
