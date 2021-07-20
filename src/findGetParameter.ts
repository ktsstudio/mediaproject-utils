export default (parameterName: string, loc = ''): null | string => {
  let result: string | null = null,
    tmp: string[] = [];

  (loc || location.search)
    .substr(1)
    .split('&')
    .forEach((item: string) => {
      tmp = item.split('=');
      if (tmp[0] === parameterName) {
        result = decodeURIComponent(tmp[1]);
      }
    });

  return result;
};
