import { fetchInitialMods, fetchModByName } from "./api-client.js";
import { createModCardElement } from "./mod-renderer.js";
import { getLatestRelease, debounce } from "./utils.js";

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

// Estado Global da Aplicação
const state = {
  rawMods: [],        // Todos os mods vindos da API
  filteredMods: [],   // Mods após aplicação de busca e categoria
  searchQuery: "",
  category: "all",
  sortBy: "downloads_desc",
  currentPage: 1,
  itemsPerPage: 12
};

/**
 * Extrai categorias únicas dos mods e popula o select dinamicamente.
 * @param {Array<Object>} mods 
 */
function populateCategoryDropdown(mods) {
  const categories = new Set(mods.map(m => m.category).filter(Boolean));
  const currentVal = categoryFilter.value;
  
  categoryFilter.innerHTML = '<option value="all">Todas as Categorias</option>';
  
  Array.from(categories).sort().forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
    categoryFilter.appendChild(option);
  });
  
  categoryFilter.value = currentVal; // Mantém a seleção se existir
}

/**
 * Pipeline central: Aplica filtros, ordenação e aciona a renderização.
 */
function processAndRender() {
  // 1. Filtro de Busca Local (se a API já trouxe tudo, ou apenas garante consistência)
  let result = state.rawMods;
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(mod => 
      (mod.name && mod.name.toLowerCase().includes(q)) || 
      (mod.title && mod.title.toLowerCase().includes(q))
    );
  }

  // 2. Filtro de Categoria
  if (state.category !== "all") {
    result = result.filter(mod => mod.category === state.category);
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
        return new Date(bRel?.released_at || 0) - new Date(aRel?.released_at || 0);
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
  renderPagination();
}

/**
 * Renderiza apenas os mods da página atual.
 */
function renderCollection() {
  modsContainer.innerHTML = "";
  labelModsCarregados.textContent = state.filteredMods.length;

  if (state.filteredMods.length === 0) {
    modsContainer.innerHTML = `
      <div class="col-12 text-center text-muted py-5">
        <h4 class="text-warning mb-3">Nenhum esquema encontrado</h4>
        <p>Ajuste seus filtros ou termos de pesquisa.</p>
      </div>`;
    return;
  }

  // Lógica de Paginação (Slice)
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedMods = state.filteredMods.slice(startIndex, endIndex);

  paginatedMods.forEach(mod => {
    const cardNode = createModCardElement(mod);
    if (cardNode) modsContainer.appendChild(cardNode);
  });
}

/**
 * Constrói os botões de paginação dinâmicos.
 */
function renderPagination() {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(state.filteredMods.length / state.itemsPerPage);

  if (totalPages <= 1) return;

  // Botão Anterior
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${state.currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Anterior">&laquo;</a>`;
  prevLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (state.currentPage > 1) {
      state.currentPage--;
      renderCollection();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  paginationContainer.appendChild(prevLi);

  // Páginas Numéricas (Limitado para não quebrar o layout)
  let startPage = Math.max(1, state.currentPage - 2);
  let endPage = Math.min(totalPages, state.currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const pageLi = document.createElement("li");
    pageLi.className = `page-item ${state.currentPage === i ? 'active' : ''}`;
    pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageLi.addEventListener("click", (e) => {
      e.preventDefault();
      state.currentPage = i;
      renderCollection();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(pageLi);
  }

  // Botão Próximo
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${state.currentPage === totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Próximo">&raquo;</a>`;
  nextLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderCollection();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  paginationContainer.appendChild(nextLi);
}

// ================= Event Listeners =================

const handleSearchInput = debounce(async (event) => {
  const query = event.target.value.trim();
  state.searchQuery = query;
  state.currentPage = 1;

  if (query.length > 0) {
    try {
      modsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="text-muted mt-2">Buscando servidores remotamente...</p>
        </div>`;
      
      const results = await fetchModByName(query);
      state.rawMods = results;
      populateCategoryDropdown(state.rawMods);
    } catch (error) {
      console.error("Erro na busca remota", error);
    }
  } else {
    // Se esvaziar, recarrega a lista inicial (ou você pode manter um cache intocável)
    init(); 
    return;
  }
  
  processAndRender();
}, 400);

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
  try {
    const rawMods = await fetchInitialMods();
    state.rawMods = rawMods;
    populateCategoryDropdown(rawMods);
    processAndRender();
  } catch (error) {
    modsContainer.innerHTML = `
      <div class="col-12 text-center py-4">
        <div class="alert alert-danger d-inline-block border-danger text-danger bg-dark">
          <strong>Falha Crítica:</strong> Servidor inacessível. Tentando reconectar...
        </div>
      </div>`;
    setTimeout(init, 7000);
  }
}

document.addEventListener("DOMContentLoaded", init);