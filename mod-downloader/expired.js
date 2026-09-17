import { fetchStatusMods } from "./api-client.js";
import { renderPagination } from "./components/pagination.js";
import { renderError } from "./components/renderError.js";
import { renderExpiredModList } from "./components/expired/expired-mod-list.js";

const modsContainer = document.getElementById("expiredModsContainer");
const modsCount = document.getElementById("expiredModsCount");
const paginationContainer = document.getElementById("expiredPagination");
const itemsPerPage = 50;
let expiredMods = [];
let currentPage = 1;

function renderExpiredMods() {
  const start = (currentPage - 1) * itemsPerPage;
  renderExpiredModList(
    modsContainer,
    expiredMods.slice(start, start + itemsPerPage),
  );

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