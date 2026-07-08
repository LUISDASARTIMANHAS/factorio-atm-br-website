import { createElement } from "./dom-utils.js";

/**
 * Renderiza dependências.
 *
 * @param {Array<string>} dependencies
 * @returns {HTMLElement|null}
 */
export function createDependencies(dependencies) {
	if (!dependencies.length) {
		return null;
	}

	const wrapper = createElement("ul", "ps-3 small");

	dependencies.forEach((dep) => {
		const item = createElement("li");

		item.textContent = dep;

		if (dep.includes("!")) {
			item.className = "text-danger";
		} else if (dep.includes("?")) {
			item.className = "text-info";
		} else {
			item.className = "text-warning";
		}

		wrapper.appendChild(item);
	});

	return wrapper;
}
