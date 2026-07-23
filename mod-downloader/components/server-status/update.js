import { updateStatusBadge } from "./badge.js";

export function updateServerStatus(container, status) {
  const dataServerLastUpdatedDateTime = container.querySelector("[data-server-last-updated-DateTime]");
  const dataServerExpiredMods = container.querySelector(
    "[data-server-expired-mods]",
  );
  const dataServerCache = container.querySelector("[data-server-cache]");
  const dataServerModsDetailed = container.querySelector(
    "[data-server-mods-detailed]",
  );
  const dataServerModsPercentExpired = container.querySelector(
    "[data-server-percent-expired]",
  );

	dataServerLastUpdatedDateTime.textContent = status.lastUpdatedDateTime ?? "-";

  dataServerExpiredMods.textContent = status.expiredMods ?? "-";

  dataServerCache.textContent = status.cache ? "Ativo" : "Desativado";

  dataServerModsDetailed.textContent =
    status.modsDetailed != null ? status.modsDetailed : "-";

  dataServerModsPercentExpired.textContent = `${status.percentExpired}%` ?? "-";
}
