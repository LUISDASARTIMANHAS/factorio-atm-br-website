export function createElement(
	tag,
	className = "",
	textContent = null,
	attributes = {},
	children = [],
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

	children.forEach(child => {
		element.appendChild(child);
	});

	return element;
}