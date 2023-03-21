import React, { Fragment } from 'react';

/**
 * Разбивает переданный текст на строки.
 * @param {string} text Текст с символами разделения
 * @param {string} divider Символ разделения, по умолчанию \n
 * @param {boolean} lineBreak Добавить переносы строк, по умолчанию true
 * @returns {JSX.Element} React.Fragment, содержащий span-элементы с текстом строк
 */

export default (
  text: string,
  divider: string | RegExp = '\n',
  lineBreak = true
): JSX.Element => {
  const lines = text.split(divider);

  return (
    <>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {lineBreak && index !== lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
};
