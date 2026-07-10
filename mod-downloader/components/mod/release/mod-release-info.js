import { createElement } from "../../base/dom-utils.js";

/**
 * Formata data da release.
 *
 * @param {string} date
 * @returns {string}
 */
function formatReleaseDate(date) {
	if (!date) {
		return "Data desconhecida";
	}

	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
		timeStyle: "short",
	}).format(new Date(date));
}

/**
 * Cria informações da release.
 *
 * @param {Object} release
 * @returns {HTMLElement}
 */
export function createReleaseInfo(release) {
	const wrapper = createElement("div", "div-info");

	wrapper.append(
		createElement("strong", "", `v${release.version}`),

		createElement(
			"p",
			"mb-1",
			`Game Version: v${release.info_json.factorio_version}`,
		),

		createElement(
			"small",
			"text-muted d-block",
			`Lançado em: ${formatReleaseDate(release.released_at)}`,
		),

		createElement(
			"small",
			"text-muted d-block",
			release.file_name,
		),
	);

	return wrapper;
}