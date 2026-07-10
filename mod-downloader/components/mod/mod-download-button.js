import config from "../../config.js";
import { createLink } from "../base/link.js";

/**
 * Cria botão de download.
 *
 * @param {Object} mod
 * @returns {HTMLAnchorElement}
 */
export function createDownloadButton(mod) {
	return createLink(
		"Download Mod",
		`${config.serverUrl}/download/mod/${encodeURIComponent(mod.name || "")}`,
		"btn btn-factorio w-100 btn-action mt-auto",
		{
			target: "_blank",
			rel: "noopener noreferrer",
		},
	);
}