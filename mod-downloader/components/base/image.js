import { createElement } from "./dom-utils.js";

/**
 * Cria uma imagem.
 *
 * @param {string} src
 * @param {string} alt
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLImageElement}
 */
export function createImage(src, alt = "", className = "", attributes = {}) {
	return createElement("img", className, null, {
		src,
		alt,
		...attributes,
	});
}
