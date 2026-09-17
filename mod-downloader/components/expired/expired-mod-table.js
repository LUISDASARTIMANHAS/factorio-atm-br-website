import { createTable } from "../base/table.js";
import { createTableBody } from "../base/tableBody.js";
import { createTableCaption } from "../base/tableCaption.js";
import { createTableHeaderCell } from "../base/tableCell.js";
import { createTableHead } from "../base/tableHead.js";
import { createTableRow } from "../base/tableRow.js";
import { createExpiredModRow } from "./expired-mod-row.js";

const tableHeaders = [
  "Nome",
  "Versão",
  "Detalhes",
  "Última atualização",
];

/**
 * Cria a tabela de mods expirados.
 *
 * @param {Array<Object>} mods
 * @returns {HTMLTableElement}
 */
export function createExpiredModTable(mods) {
  const headerCells = tableHeaders.map((header) =>
    createTableHeaderCell(header, "", { scope: "col" }),
  );
  const tableHeader = createTableHead([createTableRow(headerCells)]);
  const tableBody = createTableBody(mods.map(createExpiredModRow));
  const caption = createTableCaption(
    "Lista de mods expirados",
    "visually-hidden",
  );

  return createTable(
    "table table-dark table-striped table-hover align-middle mb-0",
    {},
    [caption, tableHeader, tableBody],
  );
}