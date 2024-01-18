/**
 * Проверяет, соответствуют ли домен приложения или адрес api девовской среде.
 * @param {string} devDomain Строка, содержащаяся в девовском домене, по умолчанию ktsdev
 * @param {boolean} isProduction Продовская ли среда
 * @return {boolean} Результат проверки
 */
export default function checkDev(
  isProduction: boolean,
  devDomain = 'ktsdev'
): boolean {
  let isDev: boolean;

  try {
    const domains = location.hostname.split('.');
    const domain = domains[domains.length - 2];

    isDev =
      domain?.includes(devDomain) ||
      process.env.API_URL?.includes(devDomain) ||
      !isProduction;
  } catch (e) {
    isDev = false;
  }

  return isDev;
}
