import React, { Fragment } from 'react';

/**
 * Разбивает переданный текст на строки.
 * Строки, которые сохранены на бэке, разделяются символом \n
 * Строки, которые тянутся из админки, разделяются символов \\n
 * @param {string} text Текст с символами разделения
 * @param {string} divider Символ разделения, по умолчанию \n
 * @param {boolean} lineBreak Добавить переносы строк, по умолчанию true
 * @returns {JSX.Element} React.Fragment, содержащий p-элементы с текстом при переносе строк или React.Fragment-элементы, если переносы не нужны
 */

export default (
  text: string,
  lineBreak = true,
  divider = '\n'
): JSX.Element => {
  const lines = text.split(divider);

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {lineBreak && <p key={index}>{line}</p>}
          {!lineBreak && line}
        </Fragment>
      ))}
    </>
  );
};
