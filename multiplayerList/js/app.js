// js\app.js
/**
 * Arquivo principal da aplicação.
 * @author Luis das Artimanhas
 */

"use strict";

/**
 * Estado global dos servidores.
 */
window.ServerStore = {
  all: [],
  filtered: [],
};

/**
 * Atualiza a informação da última atualização.
 *
 * @returns {void}
 */
function updateLastUpdate() {
  const span = document.getElementById("lastUpdate");

  if (!lastUpdate) {
    span.textContent = "Nunca atualizado";

    return;
  }

  span.textContent = "Atualizado às " + lastUpdate.toLocaleTimeString();
}

/**
 * Mede o tempo da API.
 *
 * @returns {Promise<void>}
 */
async function pingApi() {
  const badge = document.getElementById("apiPing");

  const start = performance.now();

  try {
    await fetch(API_URL, {
      headers: getApiHeaders(),
    });

    const ms = Math.round(performance.now() - start);

    badge.textContent = ms + " ms";

    badge.className =
      "badge " +
      (ms < 300 ? "bg-success" : ms < 700 ? "bg-warning" : "bg-danger");
  } catch {
    badge.textContent = "Offline";

    badge.className = "badge bg-danger";
  }
}

/**
 * Atualiza completamente a aplicação.
 *
 * @returns {Promise<void>}
 */
async function fullRefresh() {
  const icon = document.getElementById("refreshIcon");

  icon.classList.add("refreshing");

  await refreshServers(); // isso já atualiza ServerStore

  renderCards(ServerStore.filtered);

  updateStats();
  updateLastUpdate();
  await pingApi();

  icon.classList.remove("refreshing");
}

/**
 * Inicializa eventos.
 */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("refreshButton");

  button.addEventListener("click", fullRefresh);

  if (typeof bindFilters === "function") {
    bindFilters();
  }
});