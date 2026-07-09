import { createElement } from "./dom-utils.js";
import { sortReleases } from "./mod-release-utils.js";
import { createReleaseList } from "./mod-release-list.js";

/**
 * Renderiza releases do mod.
 *
 * @param {Object} mod
 * @returns {HTMLElement}
 */
export function createModReleases(mod) {
	const container = createElement(
		"div",
		"mod-releases mt-3",
	);

	const releases = sortReleases(mod.releases);

	if (!releases.length) {
		container.appendChild(
			createElement(
				"p",
				"text-muted",
				"Sem versões disponíveis",
			),
		);

		return container;
	}

	container.append(
		createElement(
			"h6",
			"mb-2",
			"Versões disponíveis",
		),

		createReleaseList(mod, releases),
	);

	return container;
}