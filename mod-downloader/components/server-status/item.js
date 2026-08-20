/**
 * Cria um item da barra de status.
 *
 * @param {string} label
 * @param {string} dataKey
 * @returns {HTMLElement}
 */
export function createStatusItem(label, dataKey) {
	const span = document.createElement("span");

	span.innerHTML = `
				<!-- StatusItem -->
				<strong>${label}:</strong>
				<span data-${dataKey}>-</span>
		`;

	return span;
}
