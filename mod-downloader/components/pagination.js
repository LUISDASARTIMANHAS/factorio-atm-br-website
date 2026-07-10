import { createPaginationItem } from "./base/paginationItem.js";
import { createPaginationLink } from "./base/paginationLink.js";

/**
 * Renderiza paginação.
 *
 * @param {HTMLElement} container
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {(page:number)=>void} onPageChange
 */
export function renderPagination(
	container,
	currentPage,
	totalPages,
	onPageChange,
) {
	container.replaceChildren();

	if (totalPages <= 1) {
		return;
	}

	container.append(
		createPaginationItem(
			createPaginationLink(
				"«",
				() => onPageChange(currentPage - 1),
			),
			currentPage === 1 ? "disabled" : "",
		),
	);

	for (
		let page = Math.max(1, currentPage - 2);
		page <= Math.min(totalPages, currentPage + 2);
		page++
	) {
		container.append(
			createPaginationItem(
				createPaginationLink(
					String(page),
					() => onPageChange(page),
				),
				page === currentPage ? "active" : "",
			),
		);
	}

	container.append(
		createPaginationItem(
			createPaginationLink(
				"»",
				() => onPageChange(currentPage + 1),
			),
			currentPage === totalPages ? "disabled" : "",
		),
	);
}