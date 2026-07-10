import { createLoading } from "./base/loading.js";

/**
 * Renderiza loading.
 *
 * @param {HTMLElement} container
 */
export function renderLoading(container) {
	container.replaceChildren(
		createLoading(
			"Buscando servidores remotos... Isso pode demorar.",
		),
	);
}