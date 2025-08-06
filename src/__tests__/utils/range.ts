/**
 * Создаёт массив чисел, увеличивающихся на единицу, начиная с начального числа и заканчивая конечным числом (не включая его).
 * Это замена оригинальной функции `range` из библиотеки lodash.
 *
 * @param {number} start - Начальное число диапазона (включительно).
 * @param {number} end - Конечное число диапазона (не включается).
 * @returns {number[]} Возвращает новый массив чисел от `start` до `end`, не включая `end`. [start, end)
 *
 * Пример: range(3, 7) → [3, 4, 5, 6]
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, i) => start + i);
}
