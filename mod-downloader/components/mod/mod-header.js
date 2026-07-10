import { createHeading } from "../base/heading.js";
import { createLink } from "../base/link.js";

/**
 * Cria título do mod.
 *
 * @param {Object} mod
 * @returns {HTMLHeadingElement}
 */
export function createModHeader(mod) {
	const title = createHeading(5, "", "card-title text-truncate");

	title.append(
		createLink(
			mod.title || mod.name || "[Sem Título]",
			`https://mods.factorio.com/mod/${encodeURIComponent(mod.name || "")}`,
			"",
			{
				target: "_blank",
				rel: "noopener noreferrer",
			},
		),
	);

	return title;
}
