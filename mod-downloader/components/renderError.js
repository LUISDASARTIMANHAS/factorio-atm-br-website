import { createErrorState } from "./base/errorState.js";

/**
 * Renderiza uma mensagem de erro.
 *
 * @param {HTMLElement} container
 * @param {string} message
 * @param {string} [title="Erro ao carregar"]
 */
export function renderError(
	container,
	message,
	title = "Erro ao carregar",
) {
	container.replaceChildren(
		createErrorState(
			message,
			title,
		),
	);
}