export const getCurrenProgressBarWidth = (time, duration) => {
  const [barElement] = [...document.getElementsByClassName('bar-wrapper')];
  return Math.floor((barElement?.clientWidth * Math.floor(time)) / Math.floor(duration));
};
