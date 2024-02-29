import { getTag } from './getTag';
import { isObjectLike } from './isObjectLike';

/**
 * Проверяет, является ли значение числом. Это замена оригинальной функции `isNumber` из библиотеки lodash.
 * @param {any} value - Значение, которое необходимо проверить.
 * @returns {boolean} Возвращает `true`, если значение является числом, иначе `false`.
 */
export function isNumber(value: any): value is number {
    return (
      typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]')
    );
  }