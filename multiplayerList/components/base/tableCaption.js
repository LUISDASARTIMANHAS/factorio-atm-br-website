import { createElement } from "./dom-utils.js";

/**
 * Cria uma legenda de tabela.
 *
 * @param {string} text
 * @param {string} className
 * @param {Object} attributes
 * @returns {HTMLTableCaptionElement}
 */
export function createTableCaption(
  text = "",
  className = "",
  attributes = {},
) {
  return createElement("caption", className, text, attributes);
}