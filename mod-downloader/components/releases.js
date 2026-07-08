import { createElement } from "./dom-utils.js";
import { isValidSecureUrl } from "../utils.js";
import config from "../config.js";

// url endpoint
// ${config.serverUrl}/download/mod/modname/version

const FACTORIO_DOWNLOAD_BASE = "https://mods.factorio.com";

/**
 * Renderiza lista de releases do mod.
 *
 * @param {Object} mod
 * @returns {HTMLElement}
 */
export function createModReleases(mod) {
	const container = createElement("div", "mod-releases mt-3");

	const releases = Array.isArray(mod.releases) ? [...mod.releases] : [];

	if (!releases.length) {
		container.appendChild(
			createElement("p", "text-muted", "Sem versões disponíveis"),
		);

		return container;
	}

	releases.sort((a, b) => new Date(b.released_at) - new Date(a.released_at));

	const title = createElement("h6", "mb-2", "Versões disponíveis");

	container.appendChild(title);

	const list = createElement("div", "list-group");

	releases.forEach((release) => {
		const item = createElement(
			"div",
			"list-group-item d-flex flex-wrap flex-column flex-md-row gap-2 justify-content-between align-items-md-center",
		);

		const info = createElement("div", "div-info");

		const version = createElement("strong", "", `v${release.version}`);

		const factorioVersion = createElement(
			"p",
			"",
			`Game Version: v${release.info_json.factorio_version}`,
		);

		const file = createElement(
			"small",
			"text-muted d-block",
			release.file_name,
		);

		info.appendChild(version);
		info.appendChild(factorioVersion);
		info.appendChild(file);

		const url = `${config.serverUrl}/download/mod/${encodeURIComponent(mod.name)}/${encodeURIComponent(release.version)}`;

		const button = createElement("a", "btn btn-sm btn-primary", "Baixar");

		button.href = isValidSecureUrl(url) ? url : "#";

		button.target = "_blank";
		button.rel = "noopener noreferrer";

		item.appendChild(info);
		item.appendChild(button);

		list.appendChild(item);
	});

	container.appendChild(list);

	return container;
}
