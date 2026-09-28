import { createElement } from "../dom-utils.js";

/**
 * Cria um botão.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLButtonElement}
 */
export function createButton(text = "", className = "", attributes = {}) {
	return createElement("button", className, text, attributes);
}
