/**
 * Ordena releases da mais nova para a mais antiga.
 *
 * @param {Array<Object>} releases
 * @returns {Array<Object>}
 */
export function sortReleases(releases = []) {
	return [...releases].sort(
		(a, b) => new Date(b.released_at) - new Date(a.released_at),
	);
}

/**
 * Agrupa releases por versão do Factorio.
 *
 * @param {Array<Object>} releases
 * @returns {Object<string, Array<Object>>}
 */
export function groupReleasesByFactorioVersion(releases = []) {
	const groups = {};

	releases.forEach((release) => {
		const version =
			release.info_json?.factorio_version ?? "Desconhecida";

		(groups[version] ??= []).push(release);
	});

	// ordena releases de cada grupo
	Object.values(groups).forEach((list) => {
		list.sort(
			(a, b) => new Date(b.released_at) - new Date(a.released_at),
		);
	});

	return Object.fromEntries(
		Object.entries(groups).sort(
			([a], [b]) => parseFloat(b) - parseFloat(a),
		),
	);
}