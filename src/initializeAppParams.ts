/*
 * Initializes app parameter with writing them in Window.
 * Writes location params (search and location_hash), flag is_production
 */
export default (): void => {
  window.search = location.search;
  window.location_hash = location.hash;

  window.is_production = process.env.NODE_ENV === 'production';
};
