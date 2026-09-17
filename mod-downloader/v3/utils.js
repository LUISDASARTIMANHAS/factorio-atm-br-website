/**
 * Arquivo utilitário para funções auxiliares e tratamento de sanidade.
 * @module utils
 */

/**
 * Retorna a versão de release mais recente baseada na propriedade 'released_at'.
 * Trata variações na estrutura de dados da API defensivamente.
 * * @function getLatestRelease
 * @param {Object} mod - Objeto contendo os dados do mod.
 * @returns {Object|null} Objeto da release mais recente ou null.
 */
export function getLatestRelease(mod) {
  if (mod.releases && Array.isArray(mod.releases) && mod.releases.length > 0) {
    return mod.releases.reduce((latest, current) => {
      return new Date(current.released_at) > new Date(latest.released_at) ? current : latest;
    }, mod.releases[0]);
  } else if (mod.latest_release) {
    return mod.latest_release;
  }
  return null;
}

/**
 * Cria uma função de atraso controlado (Debounce) ideal para inputs de busca.
 * * @function debounce
 * @param {Function} func - Função a ser executada após o tempo de espera.
 * @param {number} wait - Tempo de espera em milissegundos.
 * @returns {Function} Função envelopada para controle de execução.
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Valida de forma estrita se uma string possui o formato de uma URL válida segura (http/https).
 * Previne ataques do tipo 'javascript:alert()' no src/href.
 * * @function isValidSecureUrl
 * @param {string} stringUrl - URL string a ser validada.
 * @returns {boolean} Verdadeiro caso seja segura.
 */
export function isValidSecureUrl(stringUrl) {
  try {
    const url = new URL(stringUrl);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

/**
 * Retorna todas as versões disponíveis do mod.
 * Suporta tanto mods completos quanto mods resumidos.
 *
 * @function getAllVersions
 * @param {Object} mod - Objeto contendo os dados do mod.
 * @returns {Array<Object>} Lista de releases disponíveis.
 */
export function getAllVersions(mod) {
  if (Array.isArray(mod.releases) && mod.releases.length > 0) {
    return mod.releases;
  }

  if (mod.latest_release) {
    return [mod.latest_release];
  }

  return [];
}