/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} - The string with its first letter converted to uppercase.
 *
 * @example
 * // Returns: "Hello"
 * capitalizeFirstLetter("hello");
 */
export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
