import config from "../../config.js";
import { createElement } from "../base/dom-utils.js";


/**
 * Cria botão download.
 *
 * @param {Object} mod
 * @returns {HTMLElement}
 */
export function createDownloadButton(mod) {
	const button = createElement(
		"a",
		"btn btn-factorio w-100 btn-action mt-auto",
	);

	button.href = `${config .serverUrl}/download/mod/${encodeURIComponent(mod.name || "")}`;

	button.textContent = "Download Mod";

	button.target = "_blank";
	button.rel = "noopener noreferrer";

	return button;
}
