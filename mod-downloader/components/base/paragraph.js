import { createElement } from "./dom-utils.js";

/**
 * Cria um parágrafo.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLParagraphElement}
 */
export function createParagraph(text = "", className = "", attributes = {},children,comment="Paragrafo") {
	return createElement("p", className, text, attributes,children,comment);
}
