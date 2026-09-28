import { createElement } from "./dom-utils.js";

/**
 * Cria uma tabela.
 *
 * @param {string} className
 * @param {Object} attributes
 * @param {Node[]} children
 * @returns {HTMLTableElement}
 */
export function createTable(className = "", attributes = {}, children = []) {
  return createElement("table", className, null, attributes, children);
}