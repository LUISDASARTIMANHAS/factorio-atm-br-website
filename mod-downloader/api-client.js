import config from "./config.js";

/**
 * Camada de comunicação HTTP com a API remota.
 * @module api-client
 */

/**
 * Busca a lista inicial de mods ordenados por padrão.
 * @async
 * @function fetchInitialMods
 * @returns {Promise<Array<Object>>} Lista de objetos representando os mods.
 */
export async function fetchInitialMods() {
  const response = await fetch(`${config.serverUrl}/mods`);
  if (!response.ok) {
    throw new Error(`Erro na API (${response.status})`);
  }
  const data = await response.json();
  return data.results || [];
}

/**
 * Realiza uma busca textual por um termo específico de mod.
 * @async
 * @function fetchModByName
 * @param {string} name - Termo ou nome para pesquisar.
 * @returns {Promise<Array<Object>>} Lista de mods encontrados.
 */
export async function fetchModByName(name) {
  const encodedName = encodeURIComponent(name);
  const response = await fetch(`${config.serverUrl}/mods/search/mod?mod=${encodedName}`);
  if (!response.ok) {
    throw new Error(`Erro na busca (${response.status})`);
  }
  const data = await response.json();
  return data.mods || [];
}