/**
 * Генерирует случайное число в заданном диапазоне. Это замена оригинальной функции `random` из библиотеки lodash.
 * @param {number} min - Нижняя граница диапазона.
 * @param {number} [max=0] - Верхняя граница диапазона. По умолчанию равна 0. Если передано только одно значение, оно будет считаться верхней границей, а нижней границей будет 0.
 * @returns {number} Возвращает случайное число в заданном диапазоне.
 */
export function random(min: number, max: number = 0): number {
    if (min < max) {
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }