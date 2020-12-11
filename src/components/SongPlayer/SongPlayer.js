import React, { useCallback, useEffect, useRef, useState } from 'react';

import SongsList from '../SongsList/SongsList';
import SongPlayerControls from '../SongPlayerControls/SongPlayerControls';
import SongProgressBar from '../SongProgressBar/SongProgressBar';

import './SongPlayer.css';

const SongPlayer = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [volumeInputValue, setVolumeInputValue] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  const audioRef = useRef({});

  const handleChangeSong = (song) => {
    setCurrentSong(song);
  };

  const handleNext = useCallback(() => {
    const index = songs.findIndex((song) => song.title === currentSong.title);
    if (songs.length - 1 === index) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
  }, [currentSong.title, songs]);

  const handlePrevious = useCallback(() => {
    const index = songs.findIndex((song) => song.title === currentSong.title);

    if (!index) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
  }, [currentSong?.title, songs]);

  const handleKeyboardKeys = useCallback(
    (e) => {
      console.log(e);
      if (e.key === 'MediaTrackNext') {
        handleNext();
      } else if (e.key === 'MediaTrackPrevious') {
        handlePrevious();
      }
    },
    [handleNext, handlePrevious]
  );

  const handleVolumeChange = (e) => {
    const { value } = e.target;

    setVolumeInputValue(parseFloat(value));
    audioRef.current.volume = parseFloat(value) / 100;
  };

  const toggleLoop = () => {
    audioRef.current.loop = !audioRef.current.loop;
  };

  const toggleMute = () => {
    if (audioRef.current.muted) {
      setVolumeInputValue(audioRef.current.volume * 100);
    } else {
      setVolumeInputValue(0);
    }

    audioRef.current.muted = !audioRef.current.muted;
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPaused((prev) => !prev);
    } else {
      audioRef.current.pause();
      setIsPaused((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardKeys);

    return () => document.removeEventListener('keydown', handleKeyboardKeys);
  }, [handleKeyboardKeys]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.autoplay = true;
      setIsPaused(true);
    }
  }, [currentSong]);

  useEffect(() => {
    const index = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      }
    }, 1000);

    return () => clearInterval(index);
  }, [handleNext]);

  return (
    <>
      <section className='songplayer-container'>
        <h2 className='song-title'>{currentSong.title}</h2>
        <p className='song-author'>{currentSong.author}</p>
        <div className='songplayer-img-container'>
          <img src={currentSong.cover} alt='title' />
        </div>

        <p className='song-credits'>
          Music:{' '}
          <a href='https://www.bensound.com/' rel='noreferrer' target='_blank'>
            Bensound
          </a>
        </p>
        <audio ref={audioRef} src={currentSong.URL}></audio>
        <SongPlayerControls
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleVolumeChange={handleVolumeChange}
          isPaused={isPaused}
          toggleLoop={toggleLoop}
          toggleMute={toggleMute}
          togglePlay={togglePlay}
          volumeInputValue={volumeInputValue}
        />
        <SongProgressBar ref={audioRef} />
      </section>
      <SongsList songs={songs} songId={currentSong.id} handleChangeSong={handleChangeSong} />
    </>
  );
};

export default SongPlayer;
