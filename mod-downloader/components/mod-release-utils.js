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

export function groupReleasesByFactorioVersion(releases) {
    const groups = {};

    releases.forEach((release) => {
        const version =
            release.info_json?.factorio_version ?? "Desconhecida";

        (groups[version] ??= []).push(release);
    });

    return groups;
}