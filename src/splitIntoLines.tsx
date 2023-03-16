import * as React from 'react';

/**
 * Разбивает переданный текст на строки.
 * Строки, которые сохранены на бэке, разделяются символом \n
 * Строки, которые тянутся из админки, разделяются символов \\n
 * @param {string} text Текст с символами разделения
 * @returns {JSX.Element} React.Fragment, содержащий span-элементы с текстом строк
 */

export default (text: string): JSX.Element => {
  const lines = text.split(/\n|\\n/);

  return (
    <>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index !== lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
};
