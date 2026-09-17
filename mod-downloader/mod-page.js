import { fetchModByName } from "./api-client.js";
import { createElement } from "./components/base/dom-utils.js";
import { createCard } from "./components/base/card.js";
import { createCardBody } from "./components/base/cardBody.js";
import { createModDescription } from "./components/mod/mod-description.js";
import { createDownloadButton } from "./components/mod/mod-download-button.js";
import { createModHeader } from "./components/mod/mod-header.js";
import { createModImage } from "./components/mod/mod-image.js";
import { createMetadata } from "./components/mod/mod-metadata.js";
import { createModReleases } from "./components/mod/release/releases.js";
import { getLatestRelease } from "./utils.js";

const detailsContainer = document.getElementById("modDetails");

/**
 * Renderiza os detalhes completos de um mod.
 * @param {Object} mod
 * @returns {void}
 */
function renderModDetails(mod) {
  const release = getLatestRelease(mod);
  if (!release) {
    throw new Error("Este mod não possui versões disponíveis.");
  }

  const card = createCard("mod-card mod-details-card shadow-sm", [
    createModImage(mod),
    createCardBody("d-flex flex-column p-4", [
      createModHeader(mod),
      createModDescription(mod),
      createMetadata(mod, release),
      createModReleases(mod),
      createDownloadButton(mod),
    ]),
  ]);

  detailsContainer.replaceChildren(card);
}

/**
 * Busca o mod indicado pela URL e atualiza a página.
 * @returns {Promise<void>}
 */
async function init() {
  const name = new URLSearchParams(window.location.search).get("name");

  if (!name) {
    detailsContainer.innerHTML = '<div class="alert alert-warning">Mod não informado. <a href="./index.html">Voltar para a lista</a>.</div>';
    return;
  }

  try {
    const result = await fetchModByName(name);
    const mods = Array.isArray(result) ? result : result.mods || [];
    const mod = mods.find((item) => item.name === name) || mods[0];

    if (!mod) {
      throw new Error("Mod não encontrado.");
    }

    document.title = `${mod.title || mod.name} | Factorio Mod Browser`;
    renderModDetails(mod);
  } catch (error) {
    console.error(error);
    detailsContainer.replaceChildren(
      createElement("div", "alert alert-danger", `${error.message} `),
    );
    const backLink = document.createElement("a");
    backLink.href = "./index.html";
    backLink.textContent = "Voltar para a lista";
    detailsContainer.firstElementChild.append(backLink);
  }
}

init();
