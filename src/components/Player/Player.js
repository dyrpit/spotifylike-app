import React, { useCallback, useEffect, useRef, useState } from 'react';

import SongsList from '../SongsList/SongsList';
import Controls from '../Controls/Controls';
import ProgressBar from '../ProgressBar/ProgressBar';

import { getTimeFromWidth } from '../../utils/getTimeFromWidth';

import './Player.css';

const Player = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [volumeInputValue, setVolumeInputValue] = useState(100);
  //state: { stopped}
  const [isLooping, setIsLooping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffledSongs, setShuffledSongs] = useState([]);

  const audioRef = useRef(null);

  const handleCurrentTimeChange = (e) => {
    const barWrapper = document.querySelector('.bar-wrapper');
    const positionFromLeft = barWrapper.getBoundingClientRect().left;
    const newPosition = e.pageX - positionFromLeft;
    const newTime = getTimeFromWidth(duration, newPosition);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleSongChange = (song) => {
    setCurrentSong(song);
  };

  const shuffleSongs = useCallback(() => {
    const songsCopy = [...songs];
    const shuffledSongsList = [];

    while (songsCopy.length) {
      const randomIndex = Math.floor(Math.random() * songsCopy.length);
      const [removed] = songsCopy.splice(randomIndex, 1);
      shuffledSongsList.push(removed);
    }
    setShuffledSongs(shuffledSongsList);
  }, [songs]);

  const handleSkipSong = useCallback(
    (direction) => {
      const songIndex = songs.findIndex((song) => song.title === currentSong.title);
      const shuffledsongIndex = shuffledSongs.findIndex((song) => song.title === currentSong.title);

      if (direction === 'forward' && !isShuffled) {
        songs.length - 1 === songIndex
          ? setCurrentSong(songs[0])
          : setCurrentSong(songs[songIndex + 1]);
      } else if (direction === 'forward' && isShuffled) {
        shuffledSongs.length - 1 === shuffledsongIndex
          ? setCurrentSong(shuffledSongs[0])
          : setCurrentSong(shuffledSongs[shuffledsongIndex + 1]);
      } else if (direction === 'backward' && !isShuffled) {
        !songIndex ? setCurrentSong(songs[songs.length - 1]) : setCurrentSong(songs[songIndex - 1]);
      } else if (direction === 'backward' && isShuffled) {
        !shuffledsongIndex
          ? setCurrentSong(shuffledSongs[shuffledSongs.length - 1])
          : setCurrentSong(shuffledSongs[shuffledsongIndex - 1]);
      }
    },
    [currentSong.title, shuffledSongs, isShuffled, songs]
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
    if (!isShuffled) {
      shuffleSongs();
    } else {
      setShuffledSongs([]);
    }
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

    const handleEndedSong = () => handleSkipSong('forward');

    if (audioRef && audioRef.current) {
      const audio = audioRef.current;

      audio.addEventListener('timeupdate', handletimeUpdate);
      audio.addEventListener('ended', handleEndedSong);

      return () => {
        audio.removeEventListener('timeupdate', handletimeUpdate);
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
        <Controls
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
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          handleCurrentTimeChange={handleCurrentTimeChange}
        />
      </section>
      <SongsList songs={songs} songId={currentSong.id} handleChangeSong={handleSongChange} />
    </>
  );
};

export default Player;
