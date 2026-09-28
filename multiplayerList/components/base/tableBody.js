import { createElement } from "./dom-utils.js";

/**
 * Cria o corpo de uma tabela.
 *
 * @param {Node[]} children
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLTableSectionElement}
 */
export function createTableBody(children = [], className = "", attributes = {}) {
  return createElement("tbody", className, null, attributes, children);
}