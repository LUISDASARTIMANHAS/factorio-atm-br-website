// js/filters.js
/**
 * Estatísticas gerais.
 * @author Luis das Artimanhas
 */

"use strict";

function bindFilters() {
  const search = document.getElementById("search");
  const mods = document.getElementById("filterMods");
  const password = document.getElementById("filterPassword");
  const version = document.getElementById("filterVersion");

  function apply() {
    const searchValue = search.value.trim();
    const modsValue = mods.value;
    const passwordValue = password.value;
    const versionValue = version.value;

    let list = ServerStore.all;

    if (modsValue !== "") {
      list = list.filter(s => String(s.hasMods) === modsValue);
    }

    if (passwordValue !== "") {
      list = list.filter(s => String(s.hasPassword) === passwordValue);
    }

    if (versionValue) {
      list = list.filter(s => s.version === versionValue);
    }

    if (searchValue) {
      const q = searchValue.toLowerCase();
      list = list.filter(s =>
        (s.name || "").toLowerCase().includes(q)
      );
    }

    ServerStore.filtered = list;

    renderCards(list);
    updateStats();
  }

  search.addEventListener("input", apply);
  mods.addEventListener("change", apply);
  password.addEventListener("change", apply);
  version.addEventListener("change", apply);
}

/**
 * Anima um contador.
 *
 * @param {HTMLElement} element
 * @param {number} value
 */
function animateCounter(element, value) {
  let current = 0;

  const increment = Math.max(1, Math.ceil(value / 40));

  const timer = setInterval(() => {
    current += increment;

    if (current >= value) {
      current = value;

      clearInterval(timer);
    }

    element.textContent = current.toLocaleString();
  }, 20);
}

/**
 * Atualiza estatísticas.
 */
function updateStats() {
  const servers = ServerStore.filtered || ServerStore.all || [];

  const totalServers = servers.length;

  let totalPlayers = 0;
  let modsServers = 0;
  let passwordServers = 0;

  servers.forEach((server) => {
    totalPlayers += server.playerCount || 0;

    if (server.hasMods) modsServers++;
    if (server.hasPassword) passwordServers++;
  });

  animateCounter(document.getElementById("totalServers"), totalServers);
  animateCounter(document.getElementById("totalPlayers"), totalPlayers);
  animateCounter(document.getElementById("modsServers"), modsServers);
  animateCounter(document.getElementById("passwordServers"), passwordServers);
}

function applyFilters({ mods, password, search }) {
  let list = ServerStore.all;

  if (mods) {
    list = list.filter(s => s.hasMods);
  }

  if (password) {
    list = list.filter(s => s.hasPassword);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(s =>
      (s.name || "").toLowerCase().includes(q)
    );
  }

  ServerStore.filtered = list;

  renderCards(list);
  updateStats();
}