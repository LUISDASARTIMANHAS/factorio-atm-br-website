import { isValidSecureUrl } from "../../utils.js";
import { createImage } from "../base/image.js";

const DEFAULT_IMAGE =
	"https://factorio.com/static/img/space-age-capsule.png";

const FACTORIO_MODS_URL = "https://mods.factorio.com";

/**
 * Obtém a melhor imagem disponível do mod.
 *
 * @param {Object} mod
 * @returns {string|null}
 */
function resolveModImage(mod) {
	if (Array.isArray(mod.images) && mod.images.length > 0) {
		const image = mod.images[0];

		if (isValidSecureUrl(image.thumbnail)) {
			return image.thumbnail;
		}

		if (isValidSecureUrl(image.url)) {
			return image.url;
		}
	}

	if (isValidSecureUrl(mod.thumbnail)) {
		return mod.thumbnail;
	}

	if (mod.thumbnail?.startsWith("/")) {
		const fullUrl = `${FACTORIO_MODS_URL}${mod.thumbnail}`;

		if (isValidSecureUrl(fullUrl)) {
			return fullUrl;
		}
	}

	return null;
}

/**
 * Renderiza imagem do mod.
 *
 * @param {Object} mod
 * @returns {HTMLImageElement}
 */
export function createModImage(mod) {
	const img = createImage(
		resolveModImage(mod) || DEFAULT_IMAGE,
		mod.title || mod.name || "Factorio Mod",
		"card-img-top mod-card-img",
	);

	img.onerror = () => {
		img.src = DEFAULT_IMAGE;
	};

	return img;
}