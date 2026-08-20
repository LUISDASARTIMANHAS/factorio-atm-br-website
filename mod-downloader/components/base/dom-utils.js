export function createElement(
    tag,
    className = "",
    textContent = null,
    attributes = {},
    children = [],
    comment = `Builder - ${tag}`,
) {
    const element = document.createElement(tag);

    element.appendChild(
        document.createComment(comment)
    );

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