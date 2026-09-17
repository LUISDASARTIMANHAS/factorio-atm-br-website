import { fetchStatusMods } from "./api-client.js";
import { renderPagination } from "./components/pagination.js";
import { renderError } from "./components/renderError.js";

const modsContainer = document.getElementById("expiredModsContainer");
const modsCount = document.getElementById("expiredModsCount");
const paginationContainer = document.getElementById("expiredPagination");
const itemsPerPage = 50;
let expiredMods = [];
let currentPage = 1;

function renderExpiredMods() {
  modsContainer.replaceChildren();

  const table = document.createElement("table");
  table.className = "table table-dark table-striped table-hover align-middle mb-0";

  const caption = document.createElement("caption");
  caption.className = "visually-hidden";
  caption.textContent = "Lista de mods expirados";
  table.append(caption);

  const header = document.createElement("thead");
  header.innerHTML = "<tr><th scope=\"col\">Nome</th><th scope=\"col\">Versão</th><th scope=\"col\">Detalhes</th><th scope=\"col\">Última atualização</th></tr>";
  table.append(header);

  const body = document.createElement("tbody");
  const start = (currentPage - 1) * itemsPerPage;
  expiredMods.slice(start, start + itemsPerPage).forEach((mod) => {
    const row = document.createElement("tr");
    [
      mod.name || "-",
      mod.version || "-",
      mod.detailsLoaded ? "Carregado" : "Não carregado",
      mod.lastDetailsUpdateDateTime || formatTimestamp(mod.lastDetailsUpdate),
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value || "-";
      row.append(cell);
    });
    body.append(row);
  });
  table.append(body);
  modsContainer.append(table);

  renderPagination(
    paginationContainer,
    currentPage,
    Math.ceil(expiredMods.length / itemsPerPage),
    (page) => {
      currentPage = page;
      renderExpiredMods();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  );
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString("pt-BR");
}

async function init() {
  try {
    const status = await fetchStatusMods();
    expiredMods = Array.isArray(status?.expiredMods) ? status.expiredMods : [];
    modsCount.textContent = expiredMods.length;
    renderExpiredMods();
  } catch (error) {
    await renderError(modsContainer, error, "Erro ao carregar mods expirados.");
  }
}

document.addEventListener("DOMContentLoaded", init);