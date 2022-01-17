import { PluralizeWordsType } from './types/pluralize';

/**
 * Определяет падежное окончание слова в зависимости от числа сущностей.
 * @param {number} count Число сущностей
 * @param {PluralizeWordsType} variants Варианты слова в разных падежах. Пример: { one: 'кот', two: 'кота', five: 'котов' }
 * @returns {string} Слово с нужным падежным окончанием
 */
export const plural = (count: number, variants: PluralizeWordsType): string => {
  const lastTwo = count % 100;
  if (lastTwo > 10 && lastTwo < 20) {
    return variants.five;
  }

  const last = count % 10;
  if (last === 1) {
    return variants.one;
  }

  if (last > 1 && last < 5) {
    return variants.two;
  }

  return variants.five;
};

/**
 * Определяет падежное окончание слова в зависимости от числа сущностей и формирует строку с числом и глаголом (опционально).
 * @param {number} count Число сущностей
 * @param {PluralizeWordsType} variantsAfter Варианты слова в разных падежах, которое будет добавлено после числа. Пример: { one: 'кот', two: 'кота', five: 'котов' }
 * @param {PluralizeWordsType | null} variantsBefore Варианты слова в разных падежах, которое будет добавлено перед числом. Пример: { one: 'пришел', two: 'пришли', five: 'пришли' }
 * @returns {string} Строка с переданным числом сущностей и вариантами слов перед числом и после в нужном падеже. Например, для count = 7 результатом будет строка 'пришли 7 котов'
 */
export default (
  count: number,
  variantsAfter: PluralizeWordsType,
  variantsBefore: PluralizeWordsType | null = null
): string =>
  `${
    variantsBefore ? `${plural(count, variantsBefore)} ` : ''
  }${count} ${plural(count, variantsAfter)}`;
