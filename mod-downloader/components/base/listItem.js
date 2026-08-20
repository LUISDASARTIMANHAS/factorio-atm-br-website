import { createElement } from "./dom-utils.js";

/**
 * Cria um item de lista.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLLIElement}
 */
export function createListItem(
	text = "",
	className = "",
	attributes = {},
	children = [],
	comment = "List Item",
) {
	return createElement("li", className, text, attributes, children, comment);
}
