export default (PLATFORM: string): void => {
  if (
    PLATFORM === 'mobile_iphone' ||
    PLATFORM === 'mobile_iphone_messenger' ||
    /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
  ) {
    document.body.classList.add('ios');
  }
};
