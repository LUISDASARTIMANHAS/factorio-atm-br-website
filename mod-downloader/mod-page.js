import { fetchModByName } from "./api-client.js";
import { createElement } from "./components/base/dom-utils.js";
import { createModDetailsPage } from "./components/mod/mod-details.js";

const detailsContainer = document.getElementById("modDetails");

/**
 * Renderiza os detalhes completos de um mod.
 * @param {Object} mod
 * @returns {void}
 */
function renderModDetails(mod) {
  detailsContainer.replaceChildren(createModDetailsPage(mod));
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
