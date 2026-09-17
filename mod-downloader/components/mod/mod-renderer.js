import { getLatestRelease } from "../../utils.js";
import { createElement } from "../base/dom-utils.js";
import { createCard } from "../base/card.js";
import { createCardBody } from "../base/cardBody.js";

import { createModDescription } from "./mod-description.js";
import { createDownloadButton } from "./mod-download-button.js";
import { createModHeader } from "./mod-header.js";
import { createModImage } from "./mod-image.js";
import { createMetadata } from "./mod-metadata.js";
import { createLink } from "../base/link.js";

/**
 * Renderiza um card completo de mod.
 *
 * @param {Object} mod
 * @returns {HTMLElement|null}
 */
export function createModCardElement(mod) {
	const release = getLatestRelease(mod);

	if (!release) {
		return null;
	}

	const col = createElement(
		"div",
		"col-md-4 mb-4",
	);

	const card = createCard(
		"mod-card shadow-sm",
		[
			createModImage(mod),
			createCardBody(
				"d-flex flex-column",
				[
					createModHeader(mod),
					createModDescription(mod),
					createMetadata(mod, release),
					createLink(
						"Ver detalhes e versões",
						`./mod.html?name=${encodeURIComponent(mod.name || "")}`,
						"btn btn-outline-warning w-100 mt-3",
					),
					createDownloadButton(mod),
				].filter(Boolean),
			),
		],
	);

	col.append(card);

	return col;
}