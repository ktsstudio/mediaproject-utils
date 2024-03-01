/**
 * Создает массив чисел, увеличивающихся на единицу, начиная с начального числа и заканчивая конечным числом. 
 * Это замена оригинальной функции `range` из библиотеки lodash.
 * @param {number} start - Начальное число диапазона.
 * @param {number} end - Конечное число диапазона.
 * @returns {number[]} Возвращает новый массив чисел от `start` до `end`.
 */
export function range(start: number, end: number): number[] {
    return Array.from({length: (end - start)}, (_, i) => start + i);
  }