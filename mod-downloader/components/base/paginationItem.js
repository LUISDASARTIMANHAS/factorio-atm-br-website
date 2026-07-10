import { createElement } from "./dom-utils.js";

/**
 * Cria item de paginação.
 *
 * @param {HTMLElement} child
 * @param {string} className
 * @returns {HTMLLIElement}
 */
export function createPaginationItem(child, className = "") {
	const li = createElement("li", `page-item ${className}`);

	li.append(child);

	return li;
}
