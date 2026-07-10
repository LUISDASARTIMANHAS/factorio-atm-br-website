import { createElement } from "./dom-utils";

/**
 * Cria um item span.
 *
 * @param {string} label
 * @param {string} dataKey
 * @returns {HTMLElement}
 */
export function createStatusItem(label, dataKey,className,textContent,attributes) {
    const span = createElement("span",className,textContent,attributes)

	span.innerHTML = `
				<strong>${label}:</strong>
				<span data-${dataKey}>-</span>
		`;

	return span;
}
