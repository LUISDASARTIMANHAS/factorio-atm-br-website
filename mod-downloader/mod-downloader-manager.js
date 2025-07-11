// pesquisar mod
// https://pingobras-factorio-server.onrender.com/mods/mod a pesquisar

import { fetchInitialMods, fetchModByName } from "./mod-downloader.js";

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
    const release = getLatestRelease(mod);
    if (!release) return;

    const imgUrl = mod.thumbnail;

    const downloadUrl = mod.downloadUrl;

    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
					<div class="card mod-card h-100">
						<img src="${imgUrl}" class="card-img-top" alt="${mod.title || mod.name}">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title">${mod.title || mod.name}</h5>
							<p class="card-text">${mod.summary || mod.description || "Sem descrição"}</p>
							<p class="card-text"><strong>Versão:</strong> ${release.version}</p>
							<a href="${downloadUrl}" class="btn btn-primary mt-auto" target="_blank">Download</a>
						</div>
					</div>
				`;
    modsContainer.appendChild(card);
  });
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
      console.log("Mod Encontrado: ", mod);
      renderMods(mod);
    } catch (error) {
      modsContainer.innerHTML = `<p class="text-danger">Erro ao buscar mods.</p>`;
    }
  }
});

async function init() {
  modsData = await fetchInitialMods();
  console.log(modsData);
  renderMods(sortMods(modsData));
}

init();
