/**
 * Инициализирует параметры приложения, записывая их в Window.
 * Записывает параметры location (search и location_hash), флаг is_production
 */
export default (): void => {
  window.search = location.search;
  window.location_hash = location.hash;

  window.is_production = process.env.NODE_ENV === 'production';
};
