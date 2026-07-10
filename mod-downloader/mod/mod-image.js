import { createElement } from "../components/base/dom-utils.js";
import { isValidSecureUrl } from "../utils.js";

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
	// Novo formato API: images[]
	if (Array.isArray(mod.images) && mod.images.length > 0) {
		const image = mod.images[0];

		if (isValidSecureUrl(image.thumbnail)) {
			return image.thumbnail;
		}

		if (isValidSecureUrl(image.url)) {
			return image.url;
		}
	}

	// Formato antigo/API resumida
	if (isValidSecureUrl(mod.thumbnail)) {
		return mod.thumbnail;
	}

	// Thumbnail relativa da API
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
	const img = createElement("img", "card-img-top mod-card-img");

	img.src = resolveModImage(mod) || DEFAULT_IMAGE;

	img.alt = mod.title || mod.name || "Factorio Mod";

	img.loading = "lazy";

	img.onerror = () => {
		img.src = DEFAULT_IMAGE;
	};

	return img;
}