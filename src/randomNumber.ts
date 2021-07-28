/*
* Gets random number.
* @param {number} min Min value
* @param {number} max Max value
* @returns {number} Random number.
*/
export default (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;
