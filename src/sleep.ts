/**
 * Задержка выполнения кода на определенное количество миллисекунд.
 * @param {number} time Количество миллисекунд
 */

export default (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
