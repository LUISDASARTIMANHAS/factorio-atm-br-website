import config from "../config.js";
import { createElement } from "./dom-utils.js";
import { isValidSecureUrl } from "../utils.js";

/**
 * Cria botão de download da release.
 *
 * @param {string} modName
 * @param {string} version
 * @returns {HTMLAnchorElement}
 */
export function createReleaseDownloadButton(modName, version) {
	const url =
		`${config.serverUrl}/download/mod/` +
		`${encodeURIComponent(modName)}/` +
		`${encodeURIComponent(version)}`;

	const button = createElement("a", "btn btn-sm btn-primary", "Baixar");

	button.href = isValidSecureUrl(url) ? url : "#";

	button.target = "_blank";
	button.rel = "noopener noreferrer";

	return button;
}
