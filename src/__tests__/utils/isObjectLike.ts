/**
 * Проверяет, является ли `value` похожим на объект. Значение считается похожим на объект, если оно не `null` и имеет результат `typeof` равный "object".
 *
 * @param {any} value - Значение для проверки.
 * @returns {boolean} Возвращает `true`, если `value` похоже на объект, иначе `false`.
 */
export function isObjectLike(value: any) {
  return typeof value === 'object' && value !== null;
}