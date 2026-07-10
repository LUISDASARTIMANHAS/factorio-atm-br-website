import { createElement } from "./dom-utils.js";

/**
 * Cria um spinner Bootstrap.
 *
 * @param {string} className
 * @returns {HTMLDivElement}
 */
export function createSpinner(className = "") {
	return createElement("div", `spinner-border ${className}`, null, {
		role: "status",
	});
}
