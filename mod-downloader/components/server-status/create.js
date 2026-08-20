import { createStatusItem } from "./item.js";

export function createServerStatus(container) {
	container.replaceChildren();

	const section = document.createElement("section");

	section.className = "server-status border-bottom";

	const wrapper = document.createElement("div");

	wrapper.className =
		"container py-2 d-flex flex-wrap justify-content-center align-items-center gap-4 small";

	wrapper.appendChild(createStatusItem("Ultima vez Atualizado", "server-last-updated-DateTime"));
	wrapper.appendChild(createStatusItem("Mods Expirados", "server-expired-mods"));
	wrapper.appendChild(createStatusItem("cache", "server-cache"));
	wrapper.appendChild(createStatusItem("Mods Detalhados", "server-mods-detailed"));
	wrapper.appendChild(createStatusItem("perc de mods Expirados", "server-percent-expired"));
	wrapper.appendChild(createStatusItem("server status", "server-status-code"));

	section.appendChild(wrapper);

	container.appendChild(section);
}
