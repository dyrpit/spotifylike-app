export const getElementWidth = (element) => {
  if (!element) {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  const domElement = document.querySelector(`.${element}`);

  if (domElement) {
    return domElement.offsetWidth;
  }
};
