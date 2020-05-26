
export default (smooth = true) => {
  if ('scrollBehavior' in document.documentElement.style && smooth) {
    return window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  return window.scrollTo(0, 0);
};
