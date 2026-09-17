/**
 * Cria um elemento HTML de forma padronizada.
 *
 * @param {string} tag - Nome da tag HTML.
 * @param {string} className - Classes CSS do elemento.
 * @param {string|null} textContent - Texto do elemento.
 * @param {Object} attributes - Atributos HTML.
 * @param {Node[]} children - Elementos filhos.
 * @param {string} comment - Comentário HTML inserido no elemento.
 * @returns {HTMLElement} Elemento HTML criado.
 */
export function createElement(
    tag,
    className = "",
    textContent = null,
    attributes = {},
    children = [],
    comment = `Builder - ${tag}`,
) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (textContent !== null) {
        element.textContent = textContent;
    }

    if (attributes && typeof attributes === "object") {
        Object.entries(attributes).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                element.setAttribute(key, String(value));
            }
        });
    }

    if (Array.isArray(children)) {
        children.forEach((child) => {
            if (child instanceof Node) {
                element.appendChild(child);
            }
        });
    }

    if (comment) {
        element.prepend(
            document.createComment(comment),
        );
    }

    return element;
}