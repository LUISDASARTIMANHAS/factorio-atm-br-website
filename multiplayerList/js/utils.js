"use strict";

/**
 * Normaliza um servidor retornado pela API.
 *
 * @param {Object} server
 * @returns {Object}
*/
// gameID e o id do jogo que esta rodando agora, util para ver detalhes
// e como se fosse o id da maquina a maquina tem esse id e pode ter multiplos games id ou varios servidores de jogos diferentes como mundo ferroviario, mundo da morte
function normalizeServer(server) {
  const players = Array.isArray(server.players) ? server.players : [];

  const maxPlayers = Number(server.maxPlayers ?? server.max_players ?? 0);

  const playerCount =
    Number(server.playerCount ?? players.length ?? 0);

  return {
    ...server,

    players,

    playerCount,
    maxPlayers,

    gameId: server.game_id,
    serverId: server.server_id,

    version: server.application_version?.game_version ?? "Desconhecida",

    application_version: server.application_version ?? {},

    description: server.description || "Sem descrição.",

    modCount: Number(server.mod_count ?? server.modCount) || 0,

    hasMods: Boolean(server.has_mods ?? server.hasMods),
    hasPassword: Boolean(server.has_password ?? server.hasPassword),
    headless_server: Boolean(server.headless_server),

    tags: Array.isArray(server.tags) ? server.tags : [],
  };
}

/**
 * Copiar texto para área de transferência (fallback seguro)
 *
 * @param {string} value
 * @return {Promise<boolean>}
 */
async function copyText(value) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    // fallback antigo (funciona em HTTP e ambientes restritos)
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");

    document.body.removeChild(textarea);

    return success;
  } catch (e) {
    console.error("Erro ao copiar:", e);
    return false;
  }
}