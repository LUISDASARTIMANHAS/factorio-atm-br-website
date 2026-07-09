import { createElement } from "./dom-utils.js";
import { createReleaseInfo } from "./mod-release-info.js";
import { createReleaseDownloadButton } from "./mod-release-download.js";

/**
 * Cria item da release.
 *
 * @param {Object} mod
 * @param {Object} release
 * @returns {HTMLElement}
 */
export function createReleaseItem(mod, release) {
	const item = createElement(
		"div",
		"list-group-item flex-wrap d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2",
	);

	item.append(
		createReleaseInfo(release),
		createReleaseDownloadButton(mod.name, release.version),
	);

	return item;
}
