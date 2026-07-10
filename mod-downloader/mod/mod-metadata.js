import { createElement } from "../components/base/dom-utils.js";
import { createDependencies } from "./mod-dependencies.js";

/**
 * Cria informações técnicas do mod.
 *
 * @param {Object} mod
 * @param {Object} release
 * @returns {HTMLElement}
 */
export function createMetadata(mod, release) {
	const info = release.info_json || {};

	const list = createElement(
		"ul",
		"list-unstyled small tech-data my-3 border-top pt-2",
	);

	function add(label, value) {
		const li = createElement("li", "mb-1");

		const strong = createElement("strong");

		strong.textContent = `${label}: `;

		li.appendChild(strong);

		li.appendChild(document.createTextNode(value));

		list.appendChild(li);
	}

	add("Categoria", mod.category || "no-category");

	add("Downloads", (mod.downloads_count || 0).toLocaleString("pt-BR"));

	add("Score", Number(mod.score || 0).toFixed(2));

	add("Versão", release.version || "N/A");

	add("Factorio", info.factorio_version || "N/A");

	const deps = createDependencies(info.dependencies || []);

	if (deps) {
		list.appendChild(deps);
	}

	return list;
}
