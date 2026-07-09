import { createElement } from "./dom-utils.js";
import { groupReleasesByFactorioVersion } from "./mod-release-utils.js";
import { createReleaseGroup } from "./mod-release-group.js";

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

	const groups = groupReleasesByFactorioVersion(mod.releases);

	if (!Object.keys(groups).length) {
		container.appendChild(
			createElement(
				"p",
				"text-muted",
				"Sem versões disponíveis",
			),
		);

		return container;
	}

	container.appendChild(
		createElement(
			"h6",
			"mb-2",
			"Versões disponíveis",
		),
	);

	const accordion = createElement(
		"div",
		"accordion",
	);

	Object.entries(groups).forEach(
		([factorioVersion, releases], index) => {
			accordion.appendChild(
				createReleaseGroup(
					mod,
					factorioVersion,
					releases,
					index,
				),
			);
		},
	);

	container.appendChild(accordion);

	return container;
}