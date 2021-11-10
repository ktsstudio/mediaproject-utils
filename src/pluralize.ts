const plural = (count: number, variants: string[]): string => {
  const lastTwo = count % 100;
  if (lastTwo > 10 && lastTwo < 20) {
    return variants[0];
  }

  const last = count % 10;
  if (last === 1) {
    return variants[1];
  }

  if (last > 1 && last < 5) {
    return variants[2];
  }

  return variants[0];
};

/**
 * Определяет падежное окончание слова в зависимости от числа сущностей.
 * @param {number} count Число сущностей
 * @param {string[]} variantsAfter Варианты слова в разных падежах, которое будет добавлено после числа. Пример: ['котов', 'кот', 'кота']
 * @param {string[] | null} variantsBefore Варианты слова в разных падежах, которое будет добавлено перед числом. Пример: ['пришли', 'пришел', 'пришли']
 * @returns {string} Строка с переданным числом сущностей и вариантами слов перед числом и после в нужном падеже. Например, для count = 7 результатом будет строка 'пришли 7 котов'
 */
export default (
  count: number,
  variantsAfter: string[],
  variantsBefore: string[] | null = null
): string =>
  `${
    variantsBefore ? `${plural(count, variantsBefore)} ` : ''
  }${count} ${plural(count, variantsAfter)}`;
