import { createElement } from "./base/dom-utils.js";
import { createReleaseItem } from "./mod-release-item.js";

/**
 * Cria lista de releases.
 *
 * @param {Object} mod
 * @param {Array<Object>} releases
 * @returns {HTMLElement}
 */
export function createReleaseList(mod, releases) {
	const list = createElement("div", "list-group");

	releases.forEach((release) => {
		list.appendChild(createReleaseItem(mod, release));
	});

	return list;
}
