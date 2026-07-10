import { createElement } from "./base/dom-utils.js";

/**
 * Cria título do mod.
 *
 * @param {Object} mod
 * @returns {HTMLElement}
 */
export function createModHeader(mod) {
	const title = createElement("h5", "card-title text-truncate");

	const link = createElement("a");

	link.target = "_blank";
	link.rel = "noopener noreferrer";

	link.href = `https://mods.factorio.com/mod/${encodeURIComponent(mod.name || "")}`;

	link.textContent = mod.title || mod.name || "[Sem Título]";

	title.appendChild(link);

	return title;
}
