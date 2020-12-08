import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';
import image6 from '../images/6.jpg';

import song1 from '../audio/1.mp3';
import song2 from '../audio/2.mp3';
import song3 from '../audio/3.mp3';
import song4 from '../audio/4.mp3';
import song5 from '../audio/5.mp3';
import song6 from '../audio/6.mp3';

const songs = [
  { id: 1, title: 'Adventure', author: 'Benjamin Tissot', URL: song1, cover: image1 },
  { id: 2, title: 'Acoustic Breeze', author: 'Benjamin Tissot', URL: song2, cover: image2 },
  { id: 3, title: 'A New Beginning', author: 'Benjamin Tissot', URL: song3, cover: image3 },
  { id: 4, title: 'Memories', author: 'Benjamin Tissot', URL: song4, cover: image4 },
  { id: 5, title: 'Once Again', author: 'Benjamin Tissot', URL: song5, cover: image5 },
  { id: 6, title: 'Slow Motion', author: 'Benjamin Tissot', URL: song6, cover: image6 },
];

export const fetchMusicData = () => {
  const randomNum = Math.floor(Math.random() * 10);

  return new Promise((resolve, reject) => {
    if (randomNum) {
      setTimeout(resolve, 2000, songs);
    } else {
      reject('Cannot get songs, click refresh button to try again');
    }
  });
};
