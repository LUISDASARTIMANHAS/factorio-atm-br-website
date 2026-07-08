import { createModCardElement } from "../mod-renderer.js";


/**
 * Renderiza uma coleção de mods.
 *
 * @param {HTMLElement} container
 * @param {Array<Object>} mods
 */
export function renderModList(container, mods) {
	container.replaceChildren();

	if (mods.length === 0) {
		const empty = document.createElement("div");

		empty.className = "col-12 text-center py-5";

		empty.innerHTML = `
			<h4 class="text-warning mb-3">
				Nenhum mod encontrado
			</h4>

			<p>
				Ajuste seus filtros ou termos de pesquisa.
			</p>
		`;

		container.appendChild(empty);

		return;
	}

	mods.forEach((mod) => {
		const card = createModCardElement(mod);

		if (card) {
			container.appendChild(card);
		}
	});
}
