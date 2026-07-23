import { createList } from "../base/list.js";
import { createListItem } from "../base/listItem.js";
import { createStrong } from "../base/strong.js";
import { createDependencies } from "./mod-dependencies.js";

/**
 * Cria informações técnicas do mod.
 *
 * @param {Object} mod
 * @param {Object} release
 * @returns {HTMLUListElement}
 */
export function createMetadata(mod, release) {
	const info = release.info_json || {};

	const list = createList(
		"ul",
		"list-unstyled small tech-data my-3 border-top pt-2",
	);

	function add(label, value) {
		const li = createListItem(
			"",
			"mb-1",
		);

		li.append(
			createStrong(`${label}: `),
			document.createTextNode(value),
		);

		list.append(li);
	}

	add(
		"Categoria",
		mod.category || "no-category",
	);

	add(
		"Downloads",
		(mod.downloads_count || 0)
			.toLocaleString("pt-BR"),
	);

	add(
		"Score",
		Number(mod.score || 0)
			.toFixed(2),
	);

	add(
		"Versão",
		release.version || "N/A",
	);

	add(
		"Factorio",
		info.factorio_version || "N/A",
	);
	add(
		"Detalhes Carregados",
		mod.detailsLoaded || "N/A",
	);
	add(
		"Detalhes Atualizados em",
		new Date(mod.lastDetailsUpdate) || "N/A",
	);

	const deps = createDependencies(
		info.dependencies || [],
	);

	if (deps) {
		list.append(deps);
	}

	return list;
}