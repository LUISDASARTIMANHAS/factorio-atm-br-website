import { updateStatusBadge } from "./badge.js";

export function updateServerStatus(container, status) {
	updateStatusBadge(
		container.querySelector("[data-server-status]"),
		status.status,
	);

	container.querySelector("[data-server-version]").textContent =
		status.version ?? "-";

	container.querySelector("[data-server-cache]").textContent = status.cache
		? "Ativo"
		: "Desativado";

	container.querySelector("[data-server-latency]").textContent =
		status.responseTime != null ? `${status.responseTime} ms` : "-";

	container.querySelector("[data-server-uptime]").textContent =
		status.uptime ?? "-";
}
