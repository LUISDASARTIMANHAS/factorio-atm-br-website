import config from "./config.js";
import { getLatestRelease, isValidSecureUrl } from "./utils.js";

/**
 * Módulo especializado na renderização e manipulação do DOM sem innerHTML (Segurança Anti-XSS).
 * @module mod-renderer
 */

/**
 * Renderiza um único Card de Mod criando elementos estritos no DOM.
 * * @function createModCardElement
 * @param {Object} mod - Objeto contendo os metadados do Mod.
 * @returns {HTMLElement} O elemento do card montado e seguro para inserção.
 */
export function createModCardElement(mod) {
  const release = getLatestRelease(mod);
  if (!release) return null;

  const infoJson = release.info_json || {};
  const factorioVersion = infoJson.factorio_version || "N/A";
  const dependencies = infoJson.dependencies || [];

  // Container Coluna
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  // Elemento Card principal
  const card = document.createElement("div");
  card.className = "card mod-card h-100 shadow-sm";

  // Imagem de Preview com Validação de Endpoint
  const img = document.createElement("img");
  img.className = "card-img-top mod-card-img";
  const defaultImg = "https://factorio.com/static/img/space-age-capsule.png";
  img.src = isValidSecureUrl(mod.thumbnail) ? mod.thumbnail : defaultImg;
  img.alt = mod.title || mod.name || "Factorio Mod";
  card.appendChild(img);

  // Corpo do Card
  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  // Título e link externo seguro contra Reverse Tabnabbing
  const titleEl = document.createElement("h5");
  titleEl.className = "card-title text-truncate";
  const titleLink = document.createElement("a");
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";
  titleLink.href = `https://mods.factorio.com/mod/${encodeURIComponent(mod.name || '')}`;
  titleLink.textContent = mod.title || mod.name || "[Sem Título]";
  titleEl.appendChild(titleLink);
  cardBody.appendChild(titleEl);

  // Descrição/Sumário
  const descEl = document.createElement("p");
  descEl.className = "card-text text-muted small flex-grow-1";
  descEl.textContent = mod.summary || "Sem descrição disponível.";
  cardBody.appendChild(descEl);

  // Informações Técnicas estruturadas (Metadados)
  const metaList = document.createElement("ul");
  metaList.className = "list-unstyled small tech-data my-3 border-top pt-2 text-muted";

  const addMetaItem = (label, value) => {
    const li = document.createElement("li");
    li.className = "mb-1";
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    li.appendChild(strong);
    li.appendChild(document.createTextNode(value));
    metaList.appendChild(li);
  };

  addMetaItem("Categoria", mod.category || "no-category");
  addMetaItem("Downloads", (mod.downloads_count || 0).toLocaleString("pt-BR"));
  addMetaItem("Score", Number(mod.score || 0).toFixed(2));
  addMetaItem("Versão", release.version || "N/A");
  addMetaItem("Factorio", factorioVersion);

  // Processamento de Dependências seguro
  if (dependencies.length > 0) {
    const depTitle = document.createElement("li");
    depTitle.className = "mt-2 mb-1 fw-bold text-white";
    depTitle.textContent = "Dependências:";
    metaList.appendChild(depTitle);

    const depList = document.createElement("ul");
    depList.className = "ps-3 small";

    dependencies.forEach((dep) => {
      const depLi = document.createElement("li");
      depLi.textContent = dep;
      if (dep.includes("!")) depLi.className = "text-danger";
      else if (dep.includes("?")) depLi.className = "text-info";
      else depLi.className = "text-warning";
      depList.appendChild(depLi);
    });
    metaList.appendChild(depList);
  }

  cardBody.appendChild(metaList);

  // Botão de Download Direto
  const downloadBtn = document.createElement("a");
  downloadBtn.className = "btn btn-factorio w-100 btn-action mt-auto";
  downloadBtn.href = `${config.serverUrl}/download/mod/${encodeURIComponent(mod.name || '')}`;
  downloadBtn.textContent = "Download Mod";
  downloadBtn.target = "_blank";
  downloadBtn.rel = "noopener noreferrer";
  cardBody.appendChild(downloadBtn);

  card.appendChild(cardBody);
  col.appendChild(card);
  return col;
}