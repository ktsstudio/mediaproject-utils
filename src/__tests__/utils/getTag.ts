
/**
 * Возвращает строковое представление типа значения `value`.
 * Если значение `value` равно `null` или `undefined`, возвращает соответствующую строку.
 * В противном случае возвращает результат вызова метода `toString` для `value`.
 *
 * @param {any} value - Значение для получения его тега.
 * @returns {string} Возвращает строковое представление типа значения.
 */
export function getTag(value: any) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
  }
  