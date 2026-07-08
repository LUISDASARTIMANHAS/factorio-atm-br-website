import config from "../../src/js/config.js";

export async function fetchInitialMods() {
  const res = await fetch(`${config.apiUrl}/mods`, {
    method: "GET",

    headers: getApiHeaders(),
  });
  const data = await res.json();
  console.log("Mods retornados: ", data.results);
  return data.results;
}

export async function fetchModByName(name) {
  const res = await fetch(
    `${config.apiUrl}/mods/search/mod?mod=${encodeURIComponent(name)}`,
    {
      method: "GET",

      headers: getApiHeaders(),
    },
  );
  const data = (await res.json()).mods;
  console.log("Mods Encontrado: ", data);
  return data;
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
    authorization: "9EL36Sf#5Ksm3vmtfLDWTR",
    "x-nonce": generateNonce(),
    "x-timestamp": Date.now().toString(),
  };
}
