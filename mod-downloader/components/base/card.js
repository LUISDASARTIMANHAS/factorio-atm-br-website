import { createElement } from "./dom-utils.js";

/**
 * Cria um card Bootstrap.
 *
 * @param {string} className
 * @param {HTMLElement[]} children
 * @returns {HTMLDivElement}
 */
export function createCard(className = "", children = []) {
	const card = createElement("div", `card ${className}`);

	children.forEach((child) => {
		card.appendChild(child);
	});

	return card;
}
