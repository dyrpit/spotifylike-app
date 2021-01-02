export const getTimeFromWidth = (duration, clickedWidth) => {
  if (isNaN(duration)) {
    return 0;
  }
  const barWrapper = document.querySelector('.bar-wrapper');
  const positionFromLeft = barWrapper.getBoundingClientRect().left;
  const newWidth = clickedWidth - positionFromLeft;
  return Math.floor((newWidth * duration) / barWrapper?.clientWidth);
};
