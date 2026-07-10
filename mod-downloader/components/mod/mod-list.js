import { createModCardElement } from "./mod-renderer.js";
import { createEmptyState } from "../base/emptyState.js";

/**
 * Renderiza uma coleção de mods.
 *
 * @param {HTMLElement} container
 * @param {Array<Object>} mods
 */
export function renderModList(container, mods) {
	container.replaceChildren();

	if (mods.length === 0) {
		container.append(
			createEmptyState(
				"Nenhum mod encontrado",
				"Ajuste seus filtros ou termos de pesquisa.",
				"col-12 text-center py-5",
			),
		);

		return;
	}

	mods.forEach((mod) => {
		const card = createModCardElement(mod);

		if (card) {
			container.append(card);
		}
	});
}