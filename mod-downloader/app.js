// mod-downloader\app.js
import {
  fetchInitialMods,
  fetchModByName,
  fetchStatusMods,
} from "./api-client.js";
import { renderLoading } from "./components/renderLoading.js";
import { renderModList } from "./components/mod/mod-list.js";
import { renderPagination } from "./components/pagination.js";
import { renderError } from "./components/renderError.js";
import { updateServerStatus } from "./components/server-status/update.js";
import { createServerStatus } from "./components/server-status/create.js";
import { debounce, getLatestRelease } from "./utils.js";

/**
 * @module app
 * Orquestrador da aplicação usando arquitetura de estado reativo simplificado.
 */

// Elementos da DOM
const modsContainer = document.getElementById("modsContainer");
const labelModsCarregados = document.getElementById("modsCarregados");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const paginationContainer = document.getElementById("paginationContainer");
const serverStatusContainer = document.getElementById("serverStatusContainer");
const paginationContainerTop = document.getElementById(
  "paginationContainerTop",
);

// Estado Global da Aplicação
const state = {
  rawMods: [], // Todos os mods vindos da API
  filteredMods: [], // Mods após aplicação de busca e categoria
  searchQuery: "",
  category: "all",
  sortBy: "downloads_desc",
  currentPage: 1,
  itemsPerPage: 12,
};

/**
 * Extrai categorias únicas dos mods e popula o select dinamicamente.
 * @param {Array<Object>} mods
 */
function populateCategoryDropdown(mods) {
  if (!Array.isArray(mods)) {
    console.warn("Formato inválido para categorias:", mods);
    return;
  }

  const categories = new Set(mods.map((m) => m.category).filter(Boolean));
  const currentVal = categoryFilter.value;

  categoryFilter.innerHTML = '<option value="all">Todas as Categorias</option>';

  Array.from(categories)
    .sort()
    .forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent =
        cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " ");
      categoryFilter.appendChild(option);
    });

  categoryFilter.value = currentVal; // Mantém a seleção se existir
}

/**
 * Pipeline central: Aplica filtros, ordenação e aciona a renderização.
 */
function processAndRender() {
  // 1. Filtro de Busca Local (se a API já trouxe tudo, ou apenas garante consistência)
  let result = Array.isArray(state.rawMods) ? [...state.rawMods] : [];
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(
      (mod) =>
        (mod.name && mod.name.toLowerCase().includes(q)) ||
        (mod.title && mod.title.toLowerCase().includes(q)),
    );
  }

  // 2. Filtro de Categoria
  if (state.category !== "all") {
    result = result.filter((mod) => mod.category === state.category);
  }

  // 3. Ordenação
  result.sort((a, b) => {
    const aRel = getLatestRelease(a);
    const bRel = getLatestRelease(b);

    switch (state.sortBy) {
      case "downloads_desc":
        return (b.downloads_count || 0) - (a.downloads_count || 0);
      case "downloads_asc":
        return (a.downloads_count || 0) - (b.downloads_count || 0);
      case "recent":
        return (
          new Date(bRel?.released_at || 0) - new Date(aRel?.released_at || 0)
        );
      case "name_asc":
        return (a.title || a.name || "").localeCompare(b.title || b.name || "");
      default:
        return 0;
    }
  });

  state.filteredMods = result;

  // 4. Correção de página caso os filtros reduzam os resultados além da página atual
  const totalPages = Math.ceil(state.filteredMods.length / state.itemsPerPage);
  if (state.currentPage > totalPages && totalPages > 0) {
    state.currentPage = totalPages;
  }

  renderCollection();
  renderPaginationControls();
}

/**
 * Renderiza apenas os mods da página atual.
 */
/**
 * Renderiza apenas a página atual.
 */
function renderCollection() {
  if (state.error) {
    modsContainer.innerHTML = `
      <div class="col-12">
          <div class="alert alert-danger">
              ${state.error}
          </div>
      </div>`;
    return;
  }
  labelModsCarregados.textContent = state.filteredMods.length;

  const start = (state.currentPage - 1) * state.itemsPerPage;

  const end = start + state.itemsPerPage;

  const paginated = state.filteredMods.slice(start, end);

  renderModList(modsContainer, paginated);
}

/**
 * Constrói os botões de paginação dinâmicos.
 */
function renderPaginationControls() {
  const totalPages = Math.ceil(state.filteredMods.length / state.itemsPerPage);

  renderPagination(
    paginationContainer,
    state.currentPage,
    totalPages,
    (page) => {
      state.currentPage = page;

      renderCollection();
      renderPaginationControls();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  );

  renderPagination(
    paginationContainerTop,
    state.currentPage,
    totalPages,
    (page) => {
      state.currentPage = page;

      renderCollection();
      renderPaginationControls();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  );
}

// ================= Event Listeners =================

const handleSearchInput = debounce(async (event) => {
  const query = event.target.value.trim();
  state.searchQuery = query;
  state.currentPage = 1;

  if (query.length > 0) {
    try {
      renderLoading(modsContainer);

      const results = await fetchModByName(query);

      const mods = Array.isArray(results) ? results : results.mods || [];

      state.rawMods = mods;

      populateCategoryDropdown(state.rawMods);
    } catch (error) {
      console.error(error);

      renderError(modsContainer, error.message, "Erro ao pesquisar mods");

      return;
    }
  } else {
    // Se esvaziar, recarrega a lista inicial (ou você pode manter um cache intocável)
    init();
    return;
  }

  setTimeout(() => {
    processAndRender();
  }, 1000 * 5);
}, 500);

searchInput.addEventListener("input", handleSearchInput);

categoryFilter.addEventListener("change", (e) => {
  state.category = e.target.value;
  state.currentPage = 1;
  processAndRender();
});

sortFilter.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  state.currentPage = 1;
  processAndRender();
});

// ================= Boot =================

async function init() {
  const status = await fetchStatusMods();
  try {
    const rawMods = await fetchInitialMods();

    const mods = Array.isArray(rawMods) ? rawMods : rawMods.mods || [];

    console.log("MODS RECEBIDOS:", mods);
    console.log("TOTAL:", mods.length);

    state.rawMods = mods;

    populateCategoryDropdown(mods);
    processAndRender();
  } catch (error) {
    console.error(error);

    renderError(modsContainer, error.message, "Erro ao carregar mods.");

    setTimeout(init, 7 * 1000);
  }

  createServerStatus(serverStatusContainer);
  updateServerStatus(serverStatusContainer, {
    "lastUpdatedDateTime": status.lastUpdatedDateTime,
    "expiredMods": status.expired,
    "cache": true,
    "modsDetailed": status.full,
    "percentExpired": status.percentExpired,
  });
}

document.addEventListener("DOMContentLoaded", init);
