import { createElement } from "./dom-utils.js";

/**
 * Cria texto em destaque.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLElement}
 */
export function createStrong(
	text = "",
	className = "",
	attributes = {},
	children,
	comment = "Texto em destaque",
) {
	return createElement(
		"strong",
		className,
		text,
		attributes,
		children,
		comment,
	);
}
