/*
 * Finds GET parameter.
 * @param {string} parameterName Parameter to find
 * @param {string} loc String where to search for parameter. Default is location.search
 * @returns {null | string} Result of search
 */
export default (
  parameterName: string,
  loc = location.search
): null | string => {
  let result: string | null = null,
    tmp: string[] = [];

  loc
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
