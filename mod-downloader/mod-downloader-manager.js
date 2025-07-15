// pesquisar mod
// https://pingobras-factorio-server.onrender.com/mods/mod a pesquisar

import { fetchInitialMods, fetchModByName } from "./mod-downloader.js";
import config from "../src/js/config.js";
// baixar mod
// https://pingobras-factorio-server.onrender.com/download/mod/nome do mod
const modsContainer = document.getElementById("modsContainer");
const searchInput = document.getElementById("searchInput");
let modsData = [];


function getLatestRelease(mod) {
  if (mod.releases && Array.isArray(mod.releases)) {
    return mod.releases.reduce((latest, current) => {
      return new Date(current.released_at) > new Date(latest.released_at)
        ? current
        : latest;
    }, mod.releases[0]);
  } else if (mod.latest_release) {
    return mod.latest_release;
  }
  return null;
}

function renderMods(mods) {
  modsContainer.innerHTML = "";
  mods.forEach((mod) => {
    renderMod(mod);
  });
}

function renderMod(mod){
  const release = getLatestRelease(mod);
    if (!release) return;

    const imgUrl = mod.thumbnail;
    const downloadUrl = `${config.serverUrl}/download/mod/${encodeURIComponent(mod.name)}`;
    const releasedAt = new Date(release.released_at).toLocaleDateString("pt-BR");
    const factorioVersion = release.info_json?.factorio_version || "N/A";

    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card mod-card h-100 shadow">
        <img src="${imgUrl}" class="card-img-top" alt="${mod.title || mod.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${mod.title || mod.name}</h5>
          <p class="card-text">${mod.summary || mod.description || "Sem descrição"}</p>
          <ul class="list-unstyled small mb-3">
            <li><strong>Categoria:</strong> ${mod.category}</li>
            <li><strong>Downloads:</strong> ${mod.downloads_count.toLocaleString("pt-BR")}</li>
            <li><strong>Score:</strong> ${mod.score}</li>
            <li><strong>Versão:</strong> ${release.version}</li>
            <li><strong>Factorio:</strong> ${factorioVersion}</li>
            <li><strong>Lançado em:</strong> ${releasedAt}</li>
          </ul>
          <a href="${downloadUrl}" class="btn btn-primary mt-auto" target="_blank">Download</a>
        </div>
      </div>
    `;
    modsContainer.appendChild(card);
}


function sortMods(mods) {
  return mods.sort((a, b) => {
    const aRelease = getLatestRelease(a);
    const bRelease = getLatestRelease(b);
    if (b.downloads_count === a.downloads_count) {
      return new Date(bRelease?.released_at) - new Date(aRelease?.released_at);
    }
    return b.downloads_count - a.downloads_count;
  });
}

searchInput.addEventListener("keyup", async (e) => {
  const query = e.target.value.trim();
  if (query.length === 0) {
    renderMods(sortMods(modsData));
  } else {
    try {
      const mod = await fetchModByName(query);
      modsContainer.innerHTML = "";
      renderMod(mod);
    } catch (error) {
      modsContainer.innerHTML = `<p class="text-danger">Erro ao buscar mods.</p>`;
    }
  }
});

async function init() {
  modsData = await fetchInitialMods();
  renderMods(sortMods(modsData));
}

init();
