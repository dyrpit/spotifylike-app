export const getCurrenProgressBarWidth = (time, duration) => {
  const barElement = document.querySelector('.bar-wrapper');
  return Math.floor((barElement?.clientWidth * Math.floor(time)) / Math.floor(duration));
};
