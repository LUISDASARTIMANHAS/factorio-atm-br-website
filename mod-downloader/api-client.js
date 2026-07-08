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
  const response = await fetch(`${config.apiUrl}/mods`, {
    method: "GET",

    headers: getApiHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Erro na API (${response.apiUrl})`);
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
  const response = await fetch(
    `${config.apiUrl}/mods/search/mod?name=${encodedName}`,
    {
      method: "GET",

      headers: getApiHeaders(),
    },
  );
  if (!response.ok) {
    throw new Error(`Erro na busca (${response.status})`);
  }
  const data = await response.json();
  return data.mods || [];
}

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
    authorization: "$3559t5hLoVYS3z^Tm&doY",
    "x-nonce": generateNonce(),
    "x-timestamp": Date.now().toString(),
  };
}
