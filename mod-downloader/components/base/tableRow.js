import { createElement } from "./dom-utils.js";

/**
 * Cria uma linha de tabela.
 *
 * @param {Node[]} children
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLTableRowElement}
 */
export function createTableRow(children = [], className = "", attributes = {}) {
  return createElement("tr", className, null, attributes, children);
}