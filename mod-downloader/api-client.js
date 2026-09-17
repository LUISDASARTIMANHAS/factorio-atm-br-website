// mod-downloader\api-client.js
import config from "./config.js";
import { showErrorModal } from "./components/base/errorModal.js";

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
  const response = await defaultFetch(`${config.apiUrl}/mods`, {
    method: "GET",
  });
  const data = await response.json();
  return data || [];
}

/**
 * Status de como o cache e o servidor se comporta.
 * @async
 * @function fetchStatusMods
 * @returns {Promise<Array<Object>>} Lista de objetos representando os mods.
 */
export async function fetchStatusMods() {
  const response = await defaultFetch(`${config.apiUrl}/mods/status`, {
    method: "GET",
    disableCache: true,
  });
  const data = await response.json();
  return data || [];
}

export async function reportBug(err) {
  const payload = {
    details: err.message,
  };
  const response = await defaultFetch(`${config.apiUrl}/report`, {
    method: "POST",
    disableCache: true,
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data || [];
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
  const response = await defaultFetch(
    `${config.apiUrl}/mods/search/mod?name=${encodedName}`,
    {
      method: "GET",
    },
  );
  const data = await response.json();
  return data || [];
}

/**
 * Executa as requisições da API com as configurações padrão da aplicação.
 * Erros são exibidos no modal global e continuam sendo propagados ao chamador.
 *
 * @param {string} url
 * @param {RequestInit & {disableCache?: boolean}} options
 * @returns {Promise<Response>}
 */
async function defaultFetch(url, options = {}) {
  const { disableCache = false, headers = {}, ...requestOptions } = options;

  try {
    const response = await fetch(url, {
      ...requestOptions,
      headers: {
        ...getApiHeaders(disableCache),
        ...headers,
      },
    });

    updateServerSatusCode(response.status);

    if (!response.ok) {
      const apiError = await readApiError(response);
      const message = [apiError.error, apiError.details]
        .filter(Boolean)
        .join("\n");

      throw new Error(message || `Erro na API (${response.status})`);
    }

    return response;
  } catch (error) {
    const normalizedError = error instanceof Error
      ? error
      : new Error("Não foi possível conectar à API.");

    showErrorModal(normalizedError);
    throw normalizedError;
  }
}

/**
 * Lê a mensagem de erro enviada pela API sem falhar em respostas não-JSON.
 *
 * @param {Response} response
 * @returns {Promise<Object>}
 */
async function readApiError(response) {
  try {
    const data = await response.json();
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function updateServerSatusCode(status) {
  console.log(status);
  const statusCodeLabel = document.querySelector("[data-server-status-code]");
  if (statusCodeLabel) {
    statusCodeLabel.textContent = status ?? "-";
  }
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
function getApiHeaders(disableCache) {
  return {
    authorization: "$3559t5hLoVYS3z^Tm&doY",
    "Content-Type": "application/json",
    "x-nonce": generateNonce(),
    "x-timestamp": Date.now().toString(),
    "x-disable-cache": disableCache || false,
  };
}
