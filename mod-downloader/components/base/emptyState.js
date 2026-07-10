import { createElement } from "./dom-utils.js";
import { createHeading } from "./heading.js";
import { createParagraph } from "./paragraph.js";

/**
 * Cria um estado vazio.
 *
 * @param {string} title
 * @param {string} message
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createEmptyState(title, message, className = "") {
	return createElement("div", className, null, {}, [
		createHeading(4, title, "text-warning mb-3"),

		createParagraph(message),
	]);
}
