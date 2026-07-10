import { createElement } from "./base/dom-utils.js";

/**
 * Cria descrição do mod.
 *
 * @param {Object} mod
 * @returns {HTMLElement}
 */
export function createModDescription(mod) {
	const description = createElement("p", "card-text small");

	description.textContent = mod.summary || "Sem descrição disponível.";

	return description;
}
