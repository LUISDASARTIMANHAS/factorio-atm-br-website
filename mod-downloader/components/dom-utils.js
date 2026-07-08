/**
 * Cria um elemento DOM configurando atributos.
 *
 * @param {string} tag
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createElement(tag, className = "") {
	const element = document.createElement(tag);

	if (className) {
		element.className = className;
	}

	return element;
}
