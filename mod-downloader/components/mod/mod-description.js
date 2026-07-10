import { createParagraph } from "../base/paragraph.js";

/**
 * Cria descrição do mod.
 *
 * @param {Object} mod
 * @returns {HTMLParagraphElement}
 */
export function createModDescription(mod) {
	return createParagraph(
		mod.summary || "Sem descrição disponível.",
		"card-text small",
	);
}