import { createElement } from "./dom-utils.js";

/**
 * Cria um link.
 *
 * @param {string} text
 * @param {string} href
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLAnchorElement}
 */
export function createLink(text, href, className = "", attributes = {}) {
	return createElement("a", className, text, {
		href,
		...attributes,
	});
}
