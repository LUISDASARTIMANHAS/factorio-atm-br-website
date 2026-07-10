import { createElement } from "./dom-utils.js";

/**
 * Cria um parágrafo.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLParagraphElement}
 */
export function createParagraph(text = "", className = "", attributes = {}) {
	return createElement("p", className, text, attributes);
}
