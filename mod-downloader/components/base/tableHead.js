import { createElement } from "./dom-utils.js";

/**
 * Cria o cabeçalho de uma tabela.
 *
 * @param {Node[]} children
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLTableSectionElement}
 */
export function createTableHead(children = [], className = "", attributes = {}) {
  return createElement("thead", className, null, attributes, children);
}