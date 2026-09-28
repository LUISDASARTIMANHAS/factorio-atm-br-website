import { createElement } from "./dom-utils.js";

/**
 * Cria um título HTML.
 *
 * @param {1|2|3|4|5|6} level
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLHeadingElement}
 */
export function createHeading(
	level = 1,
	text = "",
	className = "",
	attributes = {},
) {
	return createElement(`h${level}`, className, text, attributes);
}
