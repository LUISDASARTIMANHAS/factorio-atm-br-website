import { createTableCell } from "../base/tableCell.js";
import { createTableRow } from "../base/tableRow.js";

/**
 * Cria uma linha da tabela de mods expirados.
 *
 * @param {Object} mod
 * @returns {HTMLTableRowElement}
 */
export function createExpiredModRow(mod) {
  const values = [
    mod.name || "-",
    mod.version || "-",
    mod.detailsLoaded ? "Carregado" : "Não carregado",
    mod.lastDetailsUpdateDateTime || formatTimestamp(mod.lastDetailsUpdate),
  ];

  return createTableRow(values.map((value) => createTableCell(value || "-")));
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "-";

  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString("pt-BR");
}