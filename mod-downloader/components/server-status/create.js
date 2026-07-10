import { createStatusItem } from "./item.js";

export function createServerStatus(container) {
	container.replaceChildren();

	const section = document.createElement("section");

	section.className = "server-status border-bottom";

	const wrapper = document.createElement("div");

	wrapper.className =
		"container py-2 d-flex flex-wrap justify-content-center align-items-center gap-4 small";

	const badge = document.createElement("span");

	badge.innerHTML = `
				<strong>Status:</strong>
				<span class="badge bg-secondary" data-server-status>
						Verificando...
				</span>
		`;

	wrapper.appendChild(badge);

	wrapper.appendChild(createStatusItem("Versão", "server-version"));
	wrapper.appendChild(createStatusItem("Cache", "server-cache"));
	wrapper.appendChild(createStatusItem("Resposta", "server-latency"));
	wrapper.appendChild(createStatusItem("Uptime", "server-uptime"));

	section.appendChild(wrapper);

	container.appendChild(section);
}
