import { cleanup, render } from '@testing-library/react';

import splitIntoLines from '../splitIntoLines';

afterEach(cleanup);

type Params = Parameters<typeof splitIntoLines>;

type RestParams<T = Params> = T extends [unknown, ...infer Rest] ? Rest : never;

type TestBundle = (
  title: string,
  splitter?: string,
  ...args: RestParams
) => void;

const testBundle: TestBundle = (title, splitter = '\n', divider, lineBreak) => {
  describe(title, () => {
    test('для пустой строки', () => {
      const { container } = render(splitIntoLines('', divider, lineBreak));

      expect(container).toContainHTML('<span></span>');
    });

    test('для строки без символа переноса', () => {
      const { container } = render(splitIntoLines('Hello', divider, lineBreak));

      expect(container).toContainHTML('<span>Hello</span>');
    });

    test('для строки c одним символом переноса', () => {
      const { container } = render(
        splitIntoLines(`Hello${splitter}World`, divider, lineBreak)
      );

      const expected =
        lineBreak ?? true
          ? '<span>Hello<br></span><span>World</span>'
          : '<span>Hello</span><span>World</span>';

      expect(container).toContainHTML(expected);
    });

    test('для строки c несколькими символами переноса', () => {
      const { container } = render(
        splitIntoLines(
          `Hello${splitter}Big${splitter}World`,
          divider,
          lineBreak
        )
      );

      const expected =
        lineBreak ?? true
          ? '<span>Hello<br></span><span>Big<br></span><span>World</span>'
          : '<span>Hello</span><span>Big</span><span>World</span>';

      expect(container).toContainHTML(expected);
    });

    test('для строки c несколькими символами переноса подряд', () => {
      const { container } = render(
        splitIntoLines(
          `Hello${splitter}${splitter}${splitter}World`,
          divider,
          lineBreak
        )
      );
      const expected =
        lineBreak ?? true
          ? '<span>Hello<br></span><span><br></span><span><br></span><span>World</span>'
          : '<span>Hello</span><span></span><span></span><span>World</span>';

      expect(container).toContainHTML(expected);
    });
  });
};

describe('Тест утилиты splitIntoLines:', () => {
  testBundle('С аргументами по умолчанию:');

  testBundle('С divider = "~~~":', '~~~', /~{3}/);

  testBundle('С divider = "\\t" и lineBreak = "false":', '\t', /\t/, false);
});
