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

export default (count: number, variants: string[]): string =>
  `${count} ${plural(count, variants)}`;
