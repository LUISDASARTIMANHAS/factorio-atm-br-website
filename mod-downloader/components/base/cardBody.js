import { createElement } from "./dom-utils.js";

/**
 * Cria corpo de card Bootstrap.
 *
 * @param {string} className
 * @param {HTMLElement[]} children
 * @returns {HTMLDivElement}
 */
export function createCardBody(className = "", children = []) {
	const body = createElement("div", `card-body ${className}`);

	children.forEach((child) => {
		body.appendChild(child);
	});

	return body;
}
