const logError = (error: string, ...rest: any): void => {
  if (window.is_dev) {
    // eslint-disable-next-line no-console
    console.error(`[@ktsstudio/mediaproject-utils] ${error}`, ...rest);
  }
};

export default logError;
