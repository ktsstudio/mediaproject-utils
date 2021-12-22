/**
 * Инициализирует параметры приложения, записывая их в Window.
 * Записывает параметры location (search и location_hash), флаги is_production и is_dev.
 */
export default (): void => {
  window.search = location.search;
  window.location_hash = location.hash;

  window.is_production = process.env.NODE_ENV === 'production';
  try {
    const domains = location.host.split('.');
    const domain = domains[domains.length - 2];
    window.is_dev =
      domain?.includes('ktsdev') ||
      process.env.API_URL?.includes('ktsdev') ||
      !window.is_production;
  } catch (e) {
    window.is_dev = false;
  }
};
