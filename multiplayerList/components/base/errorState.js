import { createElement } from "./dom-utils.js";
import { createHeading } from "./heading.js";
import { createParagraph } from "./paragraph.js";
import { createAlert } from "./alert.js";

/**
 * Cria uma mensagem de erro.
 *
 * @param {string} message
 * @param {string} title
 * @returns {HTMLElement}
 */
export function createErrorState(error, title = "Erro ao carregar") {
	const alert = createAlert("", "danger", "shadow-sm text-start mx-auto");

	alert.style.maxWidth = "720px";

	alert.append(
		createHeading(4, `⚠️ ${title}`, "alert-heading mb-3"),

		createParagraph(error.message || "Ocorreu um erro inesperado.", "mb-0"),
		createParagraph(`Critical Error: ${error}` || "Não foi possivel carregar os detalhes do erro.", "mb-0"),
	);

	return createElement("div", "col-12 text-center py-5", null, {}, [alert]);
}
