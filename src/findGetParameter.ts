/**
 * Находит GET параметр.
 * @param {string} parameterName Параметр, который надо найти
 * @param {string} loc Строка, где будет осуществляться поиск. По умолчанию location.search
 * @returns {null | string} Результат поиска - значение переданного параметра или null, если параметр не был найден
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
