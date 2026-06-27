// js/api.js
/**
 * API do navegador de servidores Factorio
 * @author Luis das Artimanhas
 */

"use strict";

/**
 * Gera um número aleatório para o nonce.
 *
 * @returns {string}
 */
function generateNonce() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
}

/**
 * Gera os headers obrigatórios da API.
 *
 * @returns {Object}
 */
function getApiHeaders() {
  return {
    authorization: "RekuSTYBmF",
    "x-nonce": generateNonce(),
    "x-timestamp": Date.now().toString(),
  };
}

/**
 * URL base da API.
 * Altere caso necessário.
 * @type {string}
 */
const API_URL =
  "https://pingobras-factorio-server.onrender.com/api/multiplayer/factorio";


/**
 * Intervalo de atualização.
 * @type {number}
 */
const REFRESH_INTERVAL = 1*60*1000;

/**
 * Data da última atualização.
 * @type {Date|null}
 */
let lastUpdate = null;

/**
 * Atualiza o texto de status.
 *
 * @param {string} text
 * @returns {void}
 */
function setStatus(text) {
  const status = document.getElementById("status");

  if (status) {
    status.textContent = text;
  }
}

/**
 * Busca a lista pública de servidores.
 *
 * @returns {Promise<Array>}
 */
async function fetchServers() {
  setStatus("Atualizando...");

  const response = await fetch(API_URL, {
    method: "GET",

    headers: getApiHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao obter servidores.");
  }

  return await response.json();
}

/**
 * Busca detalhes de um servidor.
 *
 * @param {string} serverId
 * @returns {Promise<Object>}
 */
async function fetchServerDetails(serverId) {
  const response = await fetch(
    API_URL + "/serverdetails?id=" + encodeURIComponent(serverId),

    {
      method: "GET",

      headers: getApiHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes.");
  }

  return await response.json();
}

/**
 * Atualiza a lista de servidores.
 *
 * @returns {Promise<void>}
 */
async function refreshServers() {
  try {
    document.body.classList.add("loading");

    const data = (await fetchServers()).map(normalizeServer);

    lastUpdate = new Date();

    ServerStore.all = data;
    ServerStore.filtered = data;

    if (typeof updateStats === "function") updateStats();
    if (typeof updateFilters === "function") updateFilters();

    if (typeof renderCards === "function") {
      renderCards(ServerStore.filtered);
    }

    updateLastUpdate();
    await pingApi();

    setStatus("Atualizado às " + lastUpdate.toLocaleTimeString());
  } catch (error) {
    console.error(error);
    setStatus("Falha ao atualizar.");
  } finally {
    document.body.classList.remove("loading");
  }
}

/**
 * Atualização automática.
 *
 * @returns {void}
 */
function startAutoRefresh() {
  setInterval(
    refreshServers,

    REFRESH_INTERVAL,
  );
}

/**
 * Exibe detalhes do servidor.
 *
 * @param {string} serverId
 * @returns {Promise<void>}
 */
async function showServer(serverId) {
  try {
    const data = await fetchServerDetails(serverId);

    const modal = new bootstrap.Modal(document.getElementById("serverModal"));

    document.getElementById("modalTitle").textContent = data.name || "Servidor";

    document.getElementById("modalBody").innerHTML =
      "<pre class='small'>" + JSON.stringify(data, null, 2) + "</pre>";

    modal.show();
  } catch (err) {
    alert(err.message);
  }
}

/**
 * Inicialização.
 */
document.addEventListener(
  "DOMContentLoaded",

  async () => {
    await refreshServers();

    startAutoRefresh();
  },
);
