import { reportBug } from "../api-client.js";
import { createErrorState } from "./base/errorState.js";

/**
 * Renderiza uma mensagem de erro.
 *
 * @param {HTMLElement} container
 * @param {string} message
 * @param {string} [title="Erro ao carregar"]
 */
export async function renderError(
	container,
	error,
	title = "Erro ao carregar",
) {
	try {
		await reportBug(error);
	} catch (reportError) {
		console.error("Não foi possível reportar o erro:", reportError);
	}

	container.replaceChildren(
		createErrorState(
			error,
			title,
		),
	);
}