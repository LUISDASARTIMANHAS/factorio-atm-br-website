import { createLink } from "./link.js";

/**
 * Cria link de paginação.
 *
 * @param {string} text
 * @param {Function} onClick
 * @param {string} className
 * @returns {HTMLAnchorElement}
 */
export function createPaginationLink(text, onClick, className = "page-link") {
	const link = createLink(text, "#", className);

	link.addEventListener("click", (event) => {
		event.preventDefault();
		onClick();
	});

	return link;
}
