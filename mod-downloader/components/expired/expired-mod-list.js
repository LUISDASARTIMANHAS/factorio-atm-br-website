import { createEmptyState } from "../base/emptyState.js";
import { createExpiredModTable } from "./expired-mod-table.js";

/**
 * Renderiza a lista de mods expirados.
 *
 * @param {HTMLElement} container
 * @param {Array<Object>} mods
 */
export function renderExpiredModList(container, mods) {
  container.replaceChildren();

  if (mods.length === 0) {
    container.append(
      createEmptyState(
        "Nenhum mod expirado",
        "A API não retornou mods expirados.",
        "text-center py-5",
      ),
    );
    return;
  }

  container.append(createExpiredModTable(mods));
}