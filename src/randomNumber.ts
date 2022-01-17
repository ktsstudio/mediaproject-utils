/**
 * Генерирует случайное число в заданном интервале.
 * @param {number} min Левая граница интервала (включительно).
 * @param {number} max Правая граница интервала (не включительно).
 * @param {boolean} isInteger Должно ли получиться целое число, по умолчанию true.
 * @returns {number} Случайное число в интервале [min, max).
 */
export default (min: number, max: number, isInteger = true): number => {
  const random = Math.random() * (max - min) + min;

  return isInteger ? Math.floor(random) : random;
};
