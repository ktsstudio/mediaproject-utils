/**
 * Проверяет, соответствуют ли домен приложения или адрес api девовской среде.
 * @param {boolean} isProduction Продовская ли среда
 * @param apiUrl URL к API
 * @param {string} devDomain Строка, содержащаяся в девовском домене, по умолчанию ktsdev
 * @return {boolean} Результат проверки
 */
export default function checkDev(
  isProduction: boolean,
  apiUrl: string,
  devDomain = 'ktsdev'
): boolean {
  let isDev: boolean;

  try {
    const domains = location.hostname.split('.');
    const domain = domains[domains.length - 2];

    isDev =
      domain?.includes(devDomain) ||
      apiUrl?.includes(devDomain) ||
      !isProduction;
  } catch (e) {
    isDev = false;
  }

  return isDev;
}
