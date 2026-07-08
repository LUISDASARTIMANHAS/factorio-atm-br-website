import { createElement } from "./dom-utils.js";
import { isValidSecureUrl } from "../utils.js";

const DEFAULT_IMAGE = "https://factorio.com/static/img/space-age-capsule.png";

/**
 * Renderiza imagem do mod.
 *
 * @param {Object} mod
 * @returns {HTMLImageElement}
 */
export function createModImage(mod) {
	const img = createElement("img", "card-img-top mod-card-img");

	img.src = isValidSecureUrl(mod.thumbnail) ? mod.thumbnail : DEFAULT_IMAGE;

	img.alt = mod.title || mod.name || "Factorio Mod";

	return img;
}
