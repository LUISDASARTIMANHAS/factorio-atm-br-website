import { createList } from "../base/list.js";
import { createListItem } from "../base/listItem.js";

/**
 * Renderiza dependências.
 *
 * @param {Array<string>} dependencies
 * @returns {HTMLUListElement|null}
 */
export function createDependencies(dependencies) {
	if (!dependencies.length) {
		return null;
	}

	const wrapper = createList("ul", "ps-3 small");

	dependencies.forEach((dep) => {
		let className = "text-warning";

		if (dep.includes("!")) {
			className = "text-danger";
		} else if (dep.includes("?")) {
			className = "text-info";
		}

		wrapper.append(
			createListItem(dep, className),
		);
	});

	return wrapper;
}