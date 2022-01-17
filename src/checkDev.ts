/**
 * Проверяет, соответствуют ли домен приложения или адрес api девовской среде.
 * Записывает в Window параметр is_dev.
 * @param {string} devDomain Строка, содержащаяся в девовском домене, по умолчанию ktsdev
 * @param {boolean} isProduction Продовская ли среда, по умолчанию берется из window.is_production
 * @return {boolean} Результат проверки
 */
export default function checkDev(
  devDomain = 'ktsdev',
  isProduction = window.is_production
): boolean {
  try {
    const domains = location.hostname.split('.');
    const domain = domains[domains.length - 2];
    window.is_dev =
      domain?.includes(devDomain) ||
      process.env.API_URL?.includes(devDomain) ||
      !isProduction;
  } catch (e) {
    window.is_dev = false;
  }

  return window.is_dev;
}
