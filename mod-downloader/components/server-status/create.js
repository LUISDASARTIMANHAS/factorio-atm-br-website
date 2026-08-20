import { createStatusItem } from "./item.js";

export function createServerStatus(container) {
	container.replaceChildren();

	container.appendChild(createStatusItem("Ultima vez Atualizado", "server-last-updated-DateTime"));
	container.appendChild(createStatusItem("Mods Expirados", "server-expired-mods"));
	container.appendChild(createStatusItem("cache", "server-cache"));
	container.appendChild(createStatusItem("Mods Detalhados", "server-mods-detailed"));
	container.appendChild(createStatusItem("perc de mods Expirados", "server-percent-expired"));
	container.appendChild(createStatusItem("server status", "server-status-code"));
}
