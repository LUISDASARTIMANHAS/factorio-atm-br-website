import { createElement } from "./dom-utils.js";

/**
 * Cria texto em destaque.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLElement}
 */
export function createSpan(
	text = "",
	className = "",
	attributes = {},
	children,
	comment = "Label span",
) {
	return createElement("span", className, text, attributes, children, comment);
}
