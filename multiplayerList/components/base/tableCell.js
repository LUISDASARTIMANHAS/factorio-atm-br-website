import { createElement } from "./dom-utils.js";

/**
 * Cria uma célula de tabela.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLTableCellElement}
 */
export function createTableCell(text = "", className = "", attributes = {}) {
  return createElement("td", className, text, attributes);
}

/**
 * Cria uma célula de cabeçalho de tabela.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLTableCellElement}
 */
export function createTableHeaderCell(
  text = "",
  className = "",
  attributes = {},
) {
  return createElement("th", className, text, attributes);
}