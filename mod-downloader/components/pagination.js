import { createElement } from "./base/dom-utils.js";

/**
 * Renderiza a paginação.
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

	container.appendChild(
		createPreviousButton(currentPage, (page) => onPageChange(page)),
	);

	const startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(totalPages, currentPage + 2);

	for (let page = startPage; page <= endPage; page++) {
		container.appendChild(
			createPageButton(page, currentPage, (selected) => onPageChange(selected)),
		);
	}

	container.appendChild(
		createNextButton(currentPage, totalPages, (page) => onPageChange(page)),
	);
}

/**
 * @param {number} currentPage
 * @param {(page:number)=>void} onClick
 * @returns {HTMLLIElement}
 */
function createPreviousButton(currentPage, onClick) {
	const li = createElement(
		"li",
		`page-item ${currentPage === 1 ? "disabled" : ""}`,
	);

	const link = createElement("a", "page-link", "«");

	link.href = "#";
	link.setAttribute("aria-label", "Anterior");

	link.addEventListener("click", (event) => {
		event.preventDefault();

		if (currentPage > 1) {
			onClick(currentPage - 1);
		}
	});

	li.appendChild(link);

	return li;
}

/**
 * @param {number} page
 * @param {number} currentPage
 * @param {(page:number)=>void} onClick
 * @returns {HTMLLIElement}
 */
function createPageButton(page, currentPage, onClick) {
	const li = createElement(
		"li",
		`page-item ${page === currentPage ? "active" : ""}`,
	);

	const link = createElement("a", "page-link", String(page));

	link.href = "#";

	link.addEventListener("click", (event) => {
		event.preventDefault();
		onClick(page);
	});

	li.appendChild(link);

	return li;
}

/**
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {(page:number)=>void} onClick
 * @returns {HTMLLIElement}
 */
function createNextButton(currentPage, totalPages, onClick) {
	const li = createElement(
		"li",
		`page-item ${currentPage === totalPages ? "disabled" : ""}`,
	);

	const link = createElement("a", "page-link", "»");

	link.href = "#";
	link.setAttribute("aria-label", "Próximo");

	link.addEventListener("click", (event) => {
		event.preventDefault();

		if (currentPage < totalPages) {
			onClick(currentPage + 1);
		}
	});

	li.appendChild(link);

	return li;
}
