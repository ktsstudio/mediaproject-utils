/**
 * Проверяет, соответствуют ли домен приложения или адрес api девовской среде.
 * Записывает в Window параметр is_dev.
 * @param {boolean} isProduction Продовская ли среда
 * @return {boolean} Результат проверки
 */
export default function checkDev(isProduction: boolean): boolean {
  try {
    const domains = location.host.split('.');
    const domain = domains[domains.length - 2];
    window.is_dev =
      domain?.includes('ktsdev') ||
      process.env.API_URL?.includes('ktsdev') ||
      !isProduction;
  } catch (e) {
    window.is_dev = false;
  }

  return window.is_dev;
}
