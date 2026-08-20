import { createElement } from "./dom-utils.js";

/**
 * Cria um spinner Bootstrap.
 *
 * @param {string} className
 * @returns {HTMLDivElement}
 */
export function createSpinner(className = "",comment="Spinner Gira Gira") {
	return createElement("div", `spinner-border ${className}`, null, {
		role: "status",
	},comment);
}
