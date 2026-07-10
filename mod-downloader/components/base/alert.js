import { createElement } from "./dom-utils.js";

/**
 * Cria um alerta Bootstrap.
 *
 * @param {string} message
 * @param {string} type
 * @param {string} className
 * @returns {HTMLDivElement}
 */
export function createAlert(message = "", type = "danger", className = "") {
	return createElement("div", `alert alert-${type} ${className}`, message, {
		role: "alert",
	});
}
