import { createElement } from "./dom-utils.js";

/**
 * Cria uma lista.
 *
 * @param {"ul"|"ol"} type
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLUListElement|HTMLOListElement}
 */
export function createList(type = "ul", className = "", attributes = {},children,comment="List") {
	return createElement(type, className, null, attributes,children,comment);
}
