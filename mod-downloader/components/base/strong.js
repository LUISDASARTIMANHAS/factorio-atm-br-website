import { createElement } from "./dom-utils.js";

/**
 * Cria texto em destaque.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLElement}
 */
export function createStrong(text = "", className = "", attributes = {}) {
	return createElement("strong", className, text, attributes);
}
