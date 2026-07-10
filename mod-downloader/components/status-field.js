/**
 * Cria um campo da barra de status.
 *
 * @param {string} label Texto exibido.
 * @param {string} key Chave usada no atributo data.
 * @param {string} [value="-"] Valor inicial.
 * @returns {HTMLElement}
 */
export function createStatusField(label, key, value = "-") {
	const field = document.createElement("span");

	field.className = "status-field";

	const strong = document.createElement("strong");
	strong.textContent = `${label}: `;

	const content = document.createElement("span");
	content.dataset.statusField = key;
	content.textContent = value;

	field.append(strong, content);

	return field;
}

/**
 * Atualiza um campo da barra de status.
 *
 * @param {HTMLElement} container
 * @param {string} key
 * @param {string} value
 */
export function updateStatusField(container, key, value) {
	const field = container.querySelector(`[data-status-field="${key}"]`);

	if (!field) {
		console.warn(`Campo "${key}" não encontrado.`);
		return;
	}

	field.textContent = value ?? "-";
}
