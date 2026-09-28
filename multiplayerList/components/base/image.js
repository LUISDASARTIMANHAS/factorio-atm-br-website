import { createElement } from "./dom-utils.js";

/**
 * Cria uma imagem.
 *
 * @param {string} src
 * @param {string} alt
 * @param {string} className
 * @param {Object} attributes
 * @param {Function|null} onError
 * @returns {HTMLImageElement}
 */
export function createImage(
	src,
	alt = "",
	className = "",
	attributes = {},
	onError = null,
) {
	const img = createElement("img", className, null, {
		src,
		alt,
		loading: "lazy",
		...attributes,
	});

	if (typeof onError === "function") {
		img.onerror = onError;
	}

	return img;
}
