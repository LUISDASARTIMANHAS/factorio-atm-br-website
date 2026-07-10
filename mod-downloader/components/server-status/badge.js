/**
 * Atualiza o badge do servidor.
 *
 * @param {HTMLElement} badge
 * @param {string} status
 */
export function updateStatusBadge(badge, status) {
	badge.textContent = status;

	badge.className = "badge";

	switch (status) {
		case "ONLINE":
			badge.classList.add("bg-success");
			break;

		case "SLOW":
			badge.classList.add("bg-warning", "text-dark");
			break;

		default:
			badge.classList.add("bg-danger");
	}
}
