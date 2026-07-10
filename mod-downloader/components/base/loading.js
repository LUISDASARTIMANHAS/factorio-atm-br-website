import { createElement } from "./dom-utils.js";
import { createSpinner } from "./spinner.js";
import { createParagraph } from "./paragraph.js";

/**
 * Cria estado de carregamento.
 *
 * @param {string} message
 * @returns {HTMLElement}
 */
export function createLoading(message = "Carregando...") {
	return createElement("div", "col-12 text-center py-5", null, {}, [
		createSpinner("text-primary"),

		createParagraph(message, "mt-2"),
	]);
}
