import { createElement } from "./base/dom-utils.js";
import { createReleaseList } from "./mod-release-list.js";

/**
 * Cria um grupo de releases por versão do Factorio.
 *
 * @param {Object} mod
 * @param {string} factorioVersion
 * @param {Array<Object>} releases
 * @param {number} index
 * @returns {HTMLElement}
 */
export function createReleaseGroup(mod, factorioVersion, releases, index) {
	const item = createElement("div", "accordion-item");

	const header = createElement("h2", "accordion-header");

	const button = createElement(
		"button",
		`accordion-button${index === 0 ? "" : " collapsed"}`,
	);

	button.type = "button";
	button.setAttribute("data-bs-toggle", "collapse");

	button.setAttribute("data-bs-target", `#factorio-release-${index}`);

	button.setAttribute("aria-expanded", index === 0 ? "true" : "false");

	button.setAttribute("aria-controls", `factorio-release-${index}`);

	button.innerHTML = `
		<div class="d-flex justify-content-between align-items-center w-100">
			<span>
				<strong>Factorio ${factorioVersion}</strong>
			</span>

			<small class="text-muted me-3">
				${releases.length} ${releases.length === 1 ? "versão" : "versões"}
			</small>
		</div>
	`;

	header.appendChild(button);

	const collapse = createElement(
		"div",
		`accordion-collapse collapse${index === 0 ? " show" : ""}`,
	);

	collapse.id = `factorio-release-${index}`;

	const body = createElement("div", "accordion-body p-0");

	body.appendChild(createReleaseList(mod, releases));

	collapse.appendChild(body);

	item.append(header, collapse);

	return item;
}
