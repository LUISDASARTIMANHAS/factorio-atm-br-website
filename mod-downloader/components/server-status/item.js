import { createSpan } from "../base/span.js";
import { createStrong } from "../base/strong.js";

/**
 * Cria um item da barra de status.
 *
 * @param {string} label
 * @param {string} dataKey
 * @returns {HTMLSpanElement}
 */
export function createStatusItem(label, dataKey) {
    const span = createSpan();

    span.append(
        createStrong(`${label}:`),
        createSpan(
            "",
            "-",
            {
                [`data-${dataKey}`]: "",
            },
        ),
    );

    return span;
}