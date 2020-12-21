export const getTimeFromWidth = (duration, width) => {
  const [barElement] = [...document.getElementsByClassName('bar-wrapper')];
  return Math.floor((width * duration) / barElement?.clientWidth);
};
