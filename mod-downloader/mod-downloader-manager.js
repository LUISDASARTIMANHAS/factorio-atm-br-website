// pesquisar mod
// https://pingobras-factorio-server.onrender.com/mods/mod a pesquisar

import { fetchInitialMods, fetchModByName } from "./mod-downloader.js";
import config from "../src/js/config.js";
// baixar mod
// https://pingobras-factorio-server.onrender.com/download/mod/nome do mod
const modsContainer = document.getElementById("modsContainer");
const labelModsCarregados = document.getElementById("modsCarregados");
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
  labelModsCarregados.textContent = mods.length;
  mods.forEach((mod) => {
    renderMod(mod);
  });
}

function renderMod(mod) {
  const release = getLatestRelease(mod);
  if (!release) return;

  const infoJson = release.info_json;
  const imgUrl = mod.thumbnail;
  const downloadUrl = `${config.serverUrl}/download/mod/${encodeURIComponent(
    mod.name
  )}`;
  const releasedAt = new Date(release.released_at).toLocaleDateString("pt-BR");
  const factorioVersion = infoJson?.factorio_version || "N/A";
  const dependencies = infoJson.dependencies;
  let listDependencies = "N/A";

  if (dependencies) {
    listDependencies = "";
    dependencies.forEach((dependencie) => {
      console.log("Encontrado dependencia: ", dependencie);
      if (dependencie.includes("!")) {
        listDependencies += `<li class='text-danger'><strong>${dependencie}</strong> </li>`;
      } else if (dependencie.includes("?")) {
        listDependencies += `<li class='text-primary'><strong>${dependencie}</strong> </li>`;
      } else {
        listDependencies += `<li class='text-warning'><strong>${dependencie}</strong> </li>`;
      }
    });
  }

  const card = document.createElement("div");
  card.className = "col-md-4 mb-4";
  card.innerHTML = `
      <div class="card mod-card h-100 shadow">
        <img src="${imgUrl}" class="card-img-top" alt="${
    mod.title || mod.name
  }">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">
            <a target="_blank" href="https://mods.factorio.com/mod/${mod.name}">
            ${mod.title || mod.name}
            </a>
          </h5>
          <p class="card-text">${
            mod.summary || mod.description || "Sem descrição"
          }</p>
          <ul class="list-unstyled small mb-3">
            <li><strong>Categoria:</strong> ${mod.category}</li>
            <li><strong>Downloads:</strong> ${mod.downloads_count.toLocaleString(
              "pt-BR"
            )}</li>
            <li><strong>Score:</strong> ${mod.score}</li>
            <li><strong>Versão:</strong> ${release.version}</li>
            <li><strong>Factorio:</strong> ${factorioVersion}</li>
            <li><strong>Lançado em:</strong> ${releasedAt}</li>
            <ul><strong>Dependencias:</strong>
            ${listDependencies}
            </ul>
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
      const mods = await fetchModByName(query);
      modsContainer.innerHTML = "";
      labelModsCarregados.textContent = mods.length;
      renderMods(mods);
    } catch (error) {
      modsContainer.innerHTML = `<p class="text-danger">Erro ao buscar mods. ${error}</p>`;
    }
  }
});

async function init() {
  try {
    modsData = await fetchInitialMods();
    renderMods(sortMods(modsData));
  } catch (error) {
    modsContainer.innerHTML = `<p class="text-danger">Erro ao buscar mods. ${error}</p>`;

    setTimeout(() => {
      modsContainer.innerHTML = `<div id="loading" class="text-center my-4">
          <div class="spinner-border text-primary" role="status"></div>
          <p>Carregando mods...</p>
        </div>`;
    }, 3000);
    setTimeout(() => {
      init();
    }, 7000);
  }
}

init();
