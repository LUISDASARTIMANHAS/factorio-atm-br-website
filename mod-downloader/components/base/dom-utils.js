// mod-downloader\components\dom-utils.js
/**
 * Cria elemento DOM configurável.
 *
 * @param {string} tag
 * @param {string} className
 * @param {string|null} textContent
 * @param {Object} attributes
 * @returns {HTMLElement}
 */
export function createElement(
	tag,
	className = "",
	textContent = null,
	attributes = {},
) {
	const element = document.createElement(tag);

	if (className) {
		element.className = className;
	}

	if (textContent !== null) {
		element.textContent = textContent;
	}

	Object.entries(attributes).forEach(
		([key, value]) => {
			element.setAttribute(key, value);
		},
	);

	return element;
}