import React, { useCallback, useEffect, useRef, useState } from 'react';

import SongsList from '../SongsList/SongsList';
import SongPlayerControls from '../SongPlayerControls/SongPlayerControls';
import SongProgressBar from '../SongProgressBar/SongProgressBar';

import './SongPlayer.css';

const SongPlayer = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [volumeInputValue, setVolumeInputValue] = useState(100);
  //state: { stopped}
  const [isLooping, setIsLooping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const handleChangeSong = (song) => {
    setCurrentSong(song);
  };

  //handle song change while shuffled

  const handleSkipSong = useCallback(
    (direction) => {
      const index = songs.findIndex((song) => song.title === currentSong.title);

      if (direction === 'forward') {
        songs.length - 1 === index ? setCurrentSong(songs[0]) : setCurrentSong(songs[index + 1]);
      } else if (direction === 'backward') {
        !index ? setCurrentSong(songs[songs.length - 1]) : setCurrentSong(songs[index - 1]);
      }
    },
    [currentSong.title, songs]
  );

  const handleKeyboardKeys = useCallback(
    (e) => {
      if (e.key === 'MediaTrackNext') {
        handleSkipSong('forward');
      } else if (e.key === 'MediaTrackPrevious') {
        handleSkipSong('backward');
      }
    },
    [handleSkipSong]
  );

  const handleVolumeChange = (e) => {
    const { value } = e.target;
    setVolumeInputValue(Number(value));
    audioRef.current.volume = Number(value) / 100;
  };

  const toggleLoop = () => {
    setIsLooping(!audioRef.current.loop);
    audioRef.current.loop = !audioRef.current.loop;
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted((prev) => !prev);
      setVolumeInputValue(audioRef.current.volume * 100);
    } else {
      setIsMuted((prev) => !prev);
      setVolumeInputValue(0);
    }

    audioRef.current.muted = !isMuted;
  };

  const toggleShuffle = () => {
    setIsShuffled((prev) => !prev);
  };

  const play = () => {
    audioRef.current.play();
    setIsPaused(false);
  };

  const togglePlay = () => {
    if (isPaused) {
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
    const handletimeUpdate = (e) => {
      setCurrentTime(e.target.currentTime);
      setDuration(e.target.duration);
    };

    const handleLoadedDataUpdate = () => play();

    const handleEndedSong = () => handleSkipSong('forward');

    if (audioRef && audioRef.current) {
      const audio = audioRef.current;

      audio.addEventListener('timeupdate', handletimeUpdate);
      audio.addEventListener('loadeddata', handleLoadedDataUpdate);
      audio.addEventListener('ended', handleEndedSong);

      return () => {
        audio.removeEventListener('timeupdate', handletimeUpdate);
        audio.removeEventListener('loadeddata', handleLoadedDataUpdate);
        audio.removeEventListener('ended', handleEndedSong);
      };
    }
  }, [handleSkipSong]);

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
          handleSkipSong={handleSkipSong}
          handleVolumeChange={handleVolumeChange}
          isLooping={isLooping}
          isPaused={isPaused}
          isShuffled={isShuffled}
          toggleLoop={toggleLoop}
          toggleMute={toggleMute}
          togglePlay={togglePlay}
          toggleShuffle={toggleShuffle}
          volumeInputValue={volumeInputValue}
        />
        <SongProgressBar currentTime={currentTime} duration={duration} />
      </section>
      <SongsList songs={songs} songId={currentSong.id} handleChangeSong={handleChangeSong} />
    </>
  );
};

export default SongPlayer;
