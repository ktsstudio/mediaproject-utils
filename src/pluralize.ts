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

/*
 * Gets word plural ending depending on count.
 * @param {number} count Number of items
 * @param {string[]} variantsAfter Variants of word plural endings, placed after. Example: ['котов', 'кот', 'кота']
 * @param {string[] | null} variantsBefore Variants of word plural endings, placed before. Example: ['пришли', 'пришел', 'пришли']
 * @returns {string} String with passed count and calculated plural endings. For example, for passed count = 7 returned string will be 'пришли 7 котов'
 */
export default (
  count: number,
  variantsAfter: string[],
  variantsBefore: string[] | null = null
): string =>
  `${
    variantsBefore ? `${plural(count, variantsBefore)} ` : ''
  }${count} ${plural(count, variantsAfter)}`;
