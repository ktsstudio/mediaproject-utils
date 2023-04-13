import { random, range } from 'lodash';

import pluralize, { plural } from './pluralize';
import { PluralizeWordsType } from './types/pluralize';

const variants: PluralizeWordsType = {
  one: 'кот',
  two: 'кота',
  five: 'котов',
};

const variantsBefore: PluralizeWordsType = {
  one: 'пришел',
  two: 'пришли',
  five: 'пришли',
};

const dropLastDigits = (x: number, count = 1): number =>
  Math.floor(x / 10 ** count);

const getSecondLastDigit = (x: number): number => dropLastDigits(x) % 10;

const MAX_NUMBER = dropLastDigits(Number.MAX_SAFE_INTEGER, 2) * 10;

const getRandomIntegerWithEnding = (ending: number): number => {
  return dropLastDigits(random(MAX_NUMBER)) * 10 + ending;
};

const LOOP_COUNT = 10;

describe(`Тест функции <plural> для слова "${variants.one}"`, () => {
  const buildSubtitle = (num: number, word: string) =>
    `для числа "${num}" ожидается слово "${word}"`;

  describe('Простые тесты:', () => {
    const buildTitle = (nums: number[], word: string) =>
      `Для чисел [${nums}] должно быть возвращено слово "${word}"`;

    const caseOne = [1, 21, 331, 4441];

    describe(buildTitle(caseOne, variants.one), () => {
      caseOne.forEach((count) => {
        test(buildSubtitle(count, variants.one), () => {
          expect(plural(count, variants)).toEqual(variants.one);
        });
      });
    });

    const caseTwo = [2, 3, 4, 22, 333, 4444];

    describe(buildTitle(caseTwo, variants.two), () => {
      caseTwo.forEach((count) => {
        test(buildSubtitle(count, variants.two), () => {
          expect(plural(count, variants)).toEqual(variants.two);
        });
      });
    });

    let caseFive = range(5, 10);
    caseFive = [0, ...caseFive, ...caseFive.map((x, i) => (i + 2) * 10 + x)];

    describe(buildTitle(caseFive, variants.five), () => {
      caseFive.forEach((count) => {
        test(buildSubtitle(count, variants.five), () => {
          expect(plural(count, variants)).toEqual(variants.five);
        });
      });
    });

    const caseTens = range(10, 20);

    describe(buildTitle(caseTens, variants.five), () => {
      caseTens.forEach((count) => {
        test(buildSubtitle(count, variants.five), () => {
          expect(plural(count, variants)).toEqual(variants.five);
        });
      });
    });
  });

  describe('Тесты на случайных числах:', () => {
    describe(`Для чисел оканчивающихся на [1], но не на [11] должно быть возвращено слово "${variants.one}"`, () => {
      for (let i = 0; i < LOOP_COUNT; i++) {
        let count = getRandomIntegerWithEnding(1);
        count = getSecondLastDigit(count) === 1 ? count + 10 : count;

        test(buildSubtitle(count, variants.one), () => {
          expect(plural(count, variants)).toEqual(variants.one);
        });
      }
    });

    describe(`Для чисел оканчивающихся на [2,3,4], но не на [12,13,14] должно быть возвращено слово "${variants.two}"`, () => {
      for (let i = 0; i < LOOP_COUNT; i++) {
        let count = getRandomIntegerWithEnding(random(2, 4));
        count = getSecondLastDigit(count) === 1 ? count + 10 : count;

        test(buildSubtitle(count, variants.two), () => {
          expect(plural(count, variants)).toEqual(variants.two);
        });
      }
    });

    describe(`Для чисел оканчивающихся на [0], или на [5-9], или на [11-19] должно быть возвращено слово "${variants.five}"`, () => {
      for (let i = 0; i < LOOP_COUNT; i++) {
        let count = random(MAX_NUMBER);
        const lastTwo = count % 100;
        const last = lastTwo % 10;

        count =
          (lastTwo > 10 && lastTwo < 20) || last === 0 || last > 4
            ? count
            : dropLastDigits(count) * 10;

        test(buildSubtitle(count, variants.five), () => {
          expect(plural(count, variants)).toEqual(variants.five);
        });
      }
    });
  });

  describe('Тесты для невалидных чисел:', () => {
    const caseEdge = [-1, -2, NaN, Infinity, -Infinity];

    describe(`Для чисел [${caseEdge}] ожидается слово "${variants.five}"`, () => {
      caseEdge.forEach((count) => {
        test(buildSubtitle(count, variants.five), () => {
          expect(plural(count, variants)).toEqual(variants.five);
        });
      });
    });
  });
});

describe(`Тест функции <pluralize> для  слова "${variants.one}" и глагола "${variantsBefore.one}"`, () => {
  const buildSubtitle = (num: number, str: string) =>
    `для числа "${num}" ожидается строка "${str}"`;

  describe('Тесты со словом без глагола:', () => {
    const buildTitle = (nums: number[], str: string) =>
      `Для чисел [${nums}] должна быть возвращено строка "${str}"`;

    const caseOne = [1, 21, 331, 4441];

    describe(buildTitle(caseOne, `_ ${variants.one}`), () => {
      caseOne.forEach((count) => {
        const expected = `${count} ${variants.one}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, variants)).toEqual(expected);
        });
      });
    });

    const caseTwo = [2, 3, 4, 22, 333, 4444];

    describe(buildTitle(caseTwo, `_ ${variants.two}`), () => {
      caseTwo.forEach((count) => {
        const expected = `${count} ${variants.two}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, variants)).toEqual(expected);
        });
      });
    });

    let caseFive = range(5, 10);
    caseFive = [0, ...caseFive, ...caseFive.map((x, i) => (i + 2) * 10 + x)];

    describe(buildTitle(caseFive, `_ ${variants.five}`), () => {
      caseFive.forEach((count) => {
        const expected = `${count} ${variants.five}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, variants)).toEqual(expected);
        });
      });
    });

    const caseTens = range(10, 20);

    describe(buildTitle(caseTens, `_ ${variants.five}`), () => {
      caseTens.forEach((count) => {
        const expected = `${count} ${variants.five}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, variants)).toEqual(expected);
        });
      });
    });
  });

  describe('Тесты с глаголом без слова:', () => {
    const buildTitle = (nums: number[], str: string) =>
      `Для чисел [${nums}] должна быть возвращено строка "${str}"`;

    const caseOne = [1, 21, 331, 4441];

    describe(buildTitle(caseOne, `${variantsBefore.one} _`), () => {
      caseOne.forEach((count) => {
        const expected = `${variantsBefore.one} ${count}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, null, variantsBefore)).toEqual(expected);
        });
      });
    });

    const caseTwo = [2, 3, 4, 22, 333, 4444];

    describe(buildTitle(caseTwo, `${variantsBefore.two} _`), () => {
      caseTwo.forEach((count) => {
        const expected = `${variantsBefore.two} ${count}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, null, variantsBefore)).toEqual(expected);
        });
      });
    });

    let caseFive = range(5, 10);
    caseFive = [0, ...caseFive, ...caseFive.map((x, i) => (i + 2) * 10 + x)];

    describe(buildTitle(caseFive, `${variantsBefore.five} _`), () => {
      caseFive.forEach((count) => {
        const expected = `${variantsBefore.five} ${count}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, null, variantsBefore)).toEqual(expected);
        });
      });
    });

    const caseTens = range(10, 20);

    describe(buildTitle(caseTens, `${variantsBefore.five} _`), () => {
      caseTens.forEach((count) => {
        const expected = `${variantsBefore.five} ${count}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count, null, variantsBefore)).toEqual(expected);
        });
      });
    });
  });

  describe('Тесты с глаголом и словом:', () => {
    const buildTitle = (nums: number[], str: string) =>
      `Для чисел [${nums}] должна быть возвращено строка "${str}"`;

    const caseOne = [1, 21, 331, 4441];

    describe(
      buildTitle(caseOne, `${variantsBefore.one} _ ${variants.one}`),
      () => {
        caseOne.forEach((count) => {
          const expected = `${variantsBefore.one} ${count} ${variants.one}`;

          test(buildSubtitle(count, expected), () => {
            expect(pluralize(count, variants, variantsBefore)).toEqual(
              expected
            );
          });
        });
      }
    );

    const caseTwo = [2, 3, 4, 22, 333, 4444];

    describe(
      buildTitle(caseTwo, `${variantsBefore.two} _ ${variants.two}`),
      () => {
        caseTwo.forEach((count) => {
          const expected = `${variantsBefore.two} ${count} ${variants.two}`;

          test(buildSubtitle(count, expected), () => {
            expect(pluralize(count, variants, variantsBefore)).toEqual(
              expected
            );
          });
        });
      }
    );

    let caseFive = range(5, 10);
    caseFive = [0, ...caseFive, ...caseFive.map((x, i) => (i + 2) * 10 + x)];

    describe(
      buildTitle(caseFive, `${variantsBefore.five} _ ${variants.five}`),
      () => {
        caseFive.forEach((count) => {
          const expected = `${variantsBefore.five} ${count} ${variants.five}`;

          test(buildSubtitle(count, expected), () => {
            expect(pluralize(count, variants, variantsBefore)).toEqual(
              expected
            );
          });
        });
      }
    );

    const caseTens = range(10, 20);

    describe(
      buildTitle(caseTens, `${variantsBefore.five} _ ${variants.five}`),
      () => {
        caseTens.forEach((count) => {
          const expected = `${variantsBefore.five} ${count} ${variants.five}`;

          test(buildSubtitle(count, expected), () => {
            expect(pluralize(count, variants, variantsBefore)).toEqual(
              expected
            );
          });
        });
      }
    );
  });

  describe('Тест функции без второго и третьего аргументов:', () => {
    const buildTitle = (nums: number[], str: string) =>
      `Для чисел [${nums}] должна быть возвращено строка "${str}"`;

    const caseOne = [1, 2, 5];

    describe(buildTitle(caseOne, '_'), () => {
      caseOne.forEach((count) => {
        const expected = `${count}`;

        test(buildSubtitle(count, expected), () => {
          expect(pluralize(count)).toEqual(expected);
        });
      });
    });
  });
});
