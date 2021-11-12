/**
 * Генерирует случайное число в заданном интервале.
 * @param {number} min Левая граница интервала.
 * @param {number} max Правая граница интервала.
 * @returns {number} Случайное число.
 */
export default (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;
